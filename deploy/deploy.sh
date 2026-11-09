#!/usr/bin/env bash
# Build the static export locally and publish it to the VPS as a new release.
#
#   npm run deploy                      # or: bash deploy/deploy.sh
#
# Releases live in $DEPLOY_ROOT/releases/<timestamp>-<git sha>; the web server
# serves $DEPLOY_ROOT/current, a symlink that is swapped atomically with
# rename(2), so visitors never see a half-uploaded site. The newest
# $KEEP_RELEASES releases are retained (current + previous ones) for rollback.
#
# Nothing is restarted on the server. Only $DEPLOY_ROOT is touched.
set -euo pipefail

: "${DEPLOY_HOST:=root@srv1727766.hstgr.cloud}"
: "${DEPLOY_ROOT:=/var/www/portfolio}"
: "${SITE_URL:=https://srv1727766.hstgr.cloud}"
: "${KEEP_RELEASES:=3}"   # current + 2 previous

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Release names carry the Git commit so a release directory on the server can
# always be traced back to source. "-dirty" flags uncommitted local changes.
SHA="$(git -C "$REPO_DIR" rev-parse --short HEAD 2>/dev/null || echo nogit)"
if [[ "$SHA" != "nogit" ]] && [[ -n "$(git -C "$REPO_DIR" status --porcelain --untracked-files=no)" ]]; then
  SHA="$SHA-dirty"
fi
RELEASE="$(date -u +%Y%m%dT%H%M%SZ)-$SHA"

step() { printf '\n\033[1m── %s\033[0m\n' "$*"; }

if [[ "$SHA" == *-dirty ]]; then
  echo "warning: deploying uncommitted changes (release will be marked -dirty)" >&2
fi

step "Build static export (NEXT_PUBLIC_SITE_URL=$SITE_URL)"
cd "$REPO_DIR"
NEXT_PUBLIC_SITE_URL="$SITE_URL" npm run build
for required in out/index.html out/404.html out/sitemap.xml out/robots.txt; do
  [[ -f "$required" ]] || { echo "build output missing $required" >&2; exit 1; }
done

step "Upload release $RELEASE"
ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_ROOT/releases/$RELEASE'"
# Symbolic --chmod works with both rsync 3.x and macOS's openrsync; the files
# must be world-readable because Caddy runs as its own unprivileged user.
rsync -az --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r out/ "$DEPLOY_HOST:$DEPLOY_ROOT/releases/$RELEASE/"

step "Activate release (atomic symlink swap) and prune"
ssh "$DEPLOY_HOST" bash -s -- "$DEPLOY_ROOT" "$RELEASE" "$KEEP_RELEASES" <<'REMOTE'
set -euo pipefail
root="$1"; release="$2"; keep="$3"
cd "$root"
[[ -f "releases/$release/index.html" ]] || { echo "release incomplete" >&2; exit 1; }

# Build the new link next to the old one, then rename over it. rename(2) is
# atomic, so `current` always resolves to a complete release.
ln -sfn "releases/$release" "current.tmp.$$"
mv -Tf "current.tmp.$$" current
echo "current -> $(readlink current)"

# Keep the newest $keep releases (including the one just activated).
cd releases
ls -1dt -- */ | sed 's#/$##' | tail -n +"$((keep + 1))" | while read -r old; do
  [[ "$old" == "$release" ]] && continue
  rm -rf -- "$old" && echo "pruned $old"
done
echo "releases retained: $(ls -1dt -- */ | sed 's#/$##' | tr '\n' ' ')"
REMOTE

step "Verify $SITE_URL"
fail=0
for path in / /work /writing /about /resume /sitemap.xml /robots.txt; do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$SITE_URL$path")"
  printf '  %-14s %s\n' "$path" "$code"
  [[ "$code" == "200" ]] || fail=1
done
code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$SITE_URL/this-page-does-not-exist")"
printf '  %-14s %s (expect 404)\n' "/missing" "$code"
[[ "$code" == "404" ]] || fail=1

if [[ $fail -eq 0 ]]; then
  echo; echo "✓ Deployed $RELEASE → $SITE_URL"
else
  echo; echo "✗ Verification failed — roll back with: bash deploy/rollback.sh" >&2
  exit 1
fi
