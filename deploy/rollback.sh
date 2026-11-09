#!/usr/bin/env bash
# Point `current` at a previous release (default: the one before the active
# release). Atomic, instant, no server restart. Only the symlink changes.
#
#   bash deploy/rollback.sh                 # previous release
#   bash deploy/rollback.sh <release-name>  # a specific retained release
#   bash deploy/rollback.sh --list          # show retained releases
set -euo pipefail

: "${DEPLOY_HOST:=root@srv1727766.hstgr.cloud}"
: "${DEPLOY_ROOT:=/var/www/portfolio}"

TARGET="${1:-}"

ssh "$DEPLOY_HOST" bash -s -- "$DEPLOY_ROOT" "$TARGET" <<'REMOTE'
set -euo pipefail
root="$1"; target="$2"
cd "$root"
active="$(basename "$(readlink current 2>/dev/null || echo none)")"
mapfile -t releases < <(cd releases && ls -1dt -- */ | sed 's#/$##')

if [[ "$target" == "--list" ]]; then
  for r in "${releases[@]}"; do
    [[ "$r" == "$active" ]] && echo "* $r (current)" || echo "  $r"
  done
  exit 0
fi

if [[ -z "$target" ]]; then
  for r in "${releases[@]}"; do
    if [[ "$r" != "$active" ]]; then target="$r"; break; fi
  done
  [[ -n "$target" ]] || { echo "no previous release to roll back to" >&2; exit 1; }
fi

[[ -f "releases/$target/index.html" ]] || { echo "release '$target' not found or incomplete" >&2; exit 1; }

ln -sfn "releases/$target" "current.tmp.$$"
mv -Tf "current.tmp.$$" current
echo "rolled back: $active -> $(basename "$(readlink current)")"
REMOTE
