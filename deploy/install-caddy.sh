#!/usr/bin/env bash
# One-time server setup: install Caddy from its official apt repository and
# install the portfolio Caddyfile. Run ON THE VPS as root:
#
#   bash install-caddy.sh /path/to/Caddyfile
#
# Idempotent. Touches only:
#   /usr/share/keyrings/caddy-stable-archive-keyring.gpg
#   /etc/apt/sources.list.d/caddy-stable.list
#   the `caddy` package and its files (/etc/caddy, /var/lib/caddy, /var/log/caddy)
#   /var/www/portfolio
# It never modifies other services, units, firewalls, or /root.
set -euo pipefail

CADDYFILE_SRC="${1:?usage: install-caddy.sh <path-to-Caddyfile>}"
WEB_ROOT="/var/www/portfolio"

echo "── Installing Caddy (official apt repo) ──"
export DEBIAN_FRONTEND=noninteractive
apt-get install -y -q debian-keyring debian-archive-keyring apt-transport-https curl >/dev/null

if [[ ! -f /usr/share/keyrings/caddy-stable-archive-keyring.gpg ]]; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
fi
if [[ ! -f /etc/apt/sources.list.d/caddy-stable.list ]]; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    | tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
fi

apt-get update -q >/dev/null
apt-get install -y -q caddy >/dev/null
echo "caddy: $(caddy version)"

echo "── Web root ──"
mkdir -p "$WEB_ROOT/releases"
chmod 755 "$WEB_ROOT" "$WEB_ROOT/releases"

echo "── Caddyfile ──"
if [[ -f /etc/caddy/Caddyfile && ! -f /etc/caddy/Caddyfile.dist ]]; then
  cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.dist   # package default, kept for reference
fi
install -m 0644 "$CADDYFILE_SRC" /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
# `caddy validate` instantiates the log writer and, running as root, can leave a
# root-owned access log that the caddy user cannot open. Hand it back to caddy.
chown -R caddy:caddy /var/log/caddy

echo "── Service ──"
systemctl enable caddy >/dev/null
if systemctl is-active --quiet caddy; then
  systemctl reload caddy
else
  systemctl start caddy
fi
sleep 2
systemctl is-active caddy && echo "caddy is running"
