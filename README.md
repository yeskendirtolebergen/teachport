# TeachPort - Teacher Academic Portfolio Platform

TeachPort is a modern, high-performance platform designed for teachers to manage their academic portfolios and for administrators to moderate achievements.

## 🌟 Features
- **Modern UI**: Built with Next.js 14, React 18, and custom Glassmorphism CSS.
- **Secure Auth**: JWT-based authentication with Role-Based Access Control (RBAC).
- **Automated Workflow**: Integration with Google Forms for seamless teacher registration.
- **Robust Testing**: Comprehensive Unit and E2E test suites using Jest and Playwright.

## 🏗️ Tech Stack
- **Frontend**: Next.js (App Router), CSS Modules.
- **Backend**: NestJS, Prisma 7, PostgreSQL.
- **Infra**: Configured for Vercel Serverless.

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
# Set up your .env with DATABASE_URL
npx prisma db push # Or use the provided schema.sql
npm run start:dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Set up your .env.local with NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
```

### 🧪 Running Tests
- **Backend Unit**: `cd backend && npm test`
- **Frontend Unit**: `cd frontend && npm test`
- **E2E Tests**: `cd frontend && npm run test:e2e`

## 📦 Deployment
Follow the [Deployment Guide](file:///Users/admin/Desktop/TeachPort/Portfolio/deployment_guide.md) for detailed instructions on Vercel and Database setup.
