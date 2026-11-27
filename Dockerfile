# syntax=docker/dockerfile:1.7
# Pin the current multi-platform index. Refresh and rescan this digest when the
# official Node tag is rebuilt with Debian security updates.
FROM node:22.23.5-bookworm-slim@sha256:be979e5523c76fa4d5ca4ebd3099078f220aa47ec39c48ad5b5df9314debd6eb AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm CYPRESS_INSTALL_BINARY=0 npm ci --no-audit --no-fund

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public
# Prerendering needs read access to portfolio data. Credentials are mounted only
# for this instruction, never passed as build arguments or copied from the context.
RUN --mount=type=secret,id=build_env,target=/app/.env.local,required=true \
    npm run build && \
    find .next/standalone -type f -name '.env*' -delete && \
    rm -rf .next/standalone/src

# The runtime needs Node and the standalone output, not npm or a shell. Pin its
# multi-platform index separately from the build image and scan the final image.
FROM gcr.io/distroless/nodejs22-debian13:nonroot@sha256:c73ddeb03e1dc2d579aa111c83d6699c6b8b487e35c0c631d4a3a20229fc25ee AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000
COPY --from=builder --chown=65532:65532 /app/.next/standalone ./
COPY --from=builder --chown=65532:65532 /app/.next/static ./.next/static
COPY --from=builder --chown=65532:65532 /app/public ./public
USER 65532:65532
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD ["/nodejs/bin/node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
CMD ["server.js"]
