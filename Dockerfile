FROM node:21-slim AS builder


ENV NODE_ENV=production

WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN yarn config set network-timeout 300000 && \
    yarn config set network-retry 3 && \
    yarn install --frozen-lockfile

COPY package.json yarn.lock ./

RUN yarn add -D @tailwindcss/postcss

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:21-slim AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile && yarn cache clean

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Commande de démarrage
CMD ["yarn", "start"]