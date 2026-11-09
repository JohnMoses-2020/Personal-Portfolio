# syntax=docker/dockerfile:1.7
#
# OPTIONAL container build. The primary deployment (deploy/) copies the static
# export straight to a VPS running Caddy; this image exists for anyone who
# prefers containers. It builds the static export and serves it with Caddy
# over HTTP on :80 — put your TLS-terminating reverse proxy in front.
#
#   docker build --build-arg NEXT_PUBLIC_SITE_URL=https://example.com -t portfolio .
#   docker run --rm -p 127.0.0.1:3100:80 portfolio
#
# NEXT_PUBLIC_* values are inlined at build time → pass them as --build-arg.

ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_GITHUB_URL
ARG NEXT_PUBLIC_LINKEDIN_URL
ARG NEXT_PUBLIC_RESUME_PDF_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_CONTACT_EMAIL=${NEXT_PUBLIC_CONTACT_EMAIL} \
    NEXT_PUBLIC_GITHUB_URL=${NEXT_PUBLIC_GITHUB_URL} \
    NEXT_PUBLIC_LINKEDIN_URL=${NEXT_PUBLIC_LINKEDIN_URL} \
    NEXT_PUBLIC_RESUME_PDF_URL=${NEXT_PUBLIC_RESUME_PDF_URL}

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM caddy:2-alpine AS runner
COPY deploy/Caddyfile.docker /etc/caddy/Caddyfile
COPY --from=build /app/out /srv
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1
