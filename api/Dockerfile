FROM denoland/deno:alpine-1.28.0

ARG PORT=80
ENV PORT=${PORT}
EXPOSE ${PORT}

WORKDIR /usr/src/app
COPY . .

HEALTHCHECK --interval=5s --timeout=2s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

CMD ["deno", "run", "--allow-net", "--allow-env", "source/index.ts"]