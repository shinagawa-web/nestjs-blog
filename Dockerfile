# ビルドステージ
FROM node:20 AS builder

WORKDIR /app

# backendとfrontend両方コピー
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

# frontendビルド
WORKDIR /app/frontend
COPY frontend/ .
RUN npm install

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# backendビルド
WORKDIR /app/backend
COPY backend/ .
RUN npm install
RUN npm run build

RUN npx prisma generate

# 実行ステージ
FROM node:20-slim

WORKDIR /app

# backendとfrontendまとめてコピー
COPY --from=builder /app .

ENV NODE_ENV=production
CMD ["node", "backend/dist/main.js"]
