# ビルドステージ
FROM node:20 AS builder

WORKDIR /app

# backendとfrontend両方コピー
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

# frontendビルド
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# backendビルド
WORKDIR /app/backend
RUN npm install
COPY backend .
RUN npm run build

# 実行ステージ
FROM node:20-slim

WORKDIR /app

# backendとfrontendまとめてコピー
COPY --from=builder /app .

ENV NODE_ENV=production
CMD ["node", "backend/dist/main.js"]
