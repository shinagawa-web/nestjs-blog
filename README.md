## NestJS + Prisma + React + Railway Blog App

This repository contains a full-stack blog application built with:

- 🛠️ NestJS for the backend API
- 🛠️ Prisma for database management
- 🛠️ React (Vite + Tailwind CSS) for the frontend UI
- 🚀 Railway for cloud deployment

The project is designed with real-world deployment in mind, including production build setup, database migration management, environment variable handling, and Docker-based deployment.

For a detailed guide on how to set up and deploy this project, please refer to the blog post:
👉 https://shinagawa-web.com/blogs/nestjs-blog-series-setup-and-config


### 🚀 Features

- Full TypeScript stack (NestJS + React)
- Prisma ORM with PostgreSQL
- Environment-based configuration (development, test, production)
- Frontend and backend separation with unified deployment
- Static file serving for frontend via NestJS backend
- Docker-based production builds
- Ready to deploy to Railway (or other cloud services)

### 📦 Project Structure

```
/backend      -> NestJS application (API server)
/frontend     -> React application (client-side UI)
/docker-compose.dev.yml -> Development environment (hot reload support)
/Dockerfile ->  Dockerfile for production deployment
```

### 🛠️ Getting Started
Development Environment (Local)

```
# Start development environment
docker-compose -f docker-compose.dev.yml up --build
```

```
# Migrate DB schema
docker-compose exec backend  npx prisma migrate deploy
```

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api

### 📝 Notes

- Frontend communicates with the backend via an environment variable VITE_API_URL.
- Be sure to set proper environment variables when deploying (e.g., DATABASE_URL, VITE_API_URL).

### 📖 Learn More

For a full tutorial including:

- Project setup
- Environment configuration
- Prisma integration
- Dockerization
- Railway deployment

please check the blog post:
👉 https://shinagawa-web.com/blogs/nestjs-blog-series-setup-and-config