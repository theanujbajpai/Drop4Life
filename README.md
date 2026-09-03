# 🩸 Drop4Life — Production-Ready Blood Donation Platform

> **Every Drop Can Save a Life**

Drop4Life is a modern, full-stack blood donation platform that connects donors with recipients in real-time. Built with Angular and Spring Boot, it features smart donor matching, real-time WebSocket notifications, and a professional healthcare UI.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 18, Angular Material, Tailwind CSS 3, Leaflet Maps |
| **Backend** | Java 22, Spring Boot 3.3, Spring Security, Spring Data JPA |
| **Database** | PostgreSQL 16 |
| **Real-time** | WebSocket / STOMP |
| **Auth** | JWT + Refresh Token, BCrypt |
| **DevOps** | Docker, Docker Compose |

## 📁 Project Structure

```
Drop4Life/
├── frontend/          # Angular 18 application
├── backend/           # Spring Boot 3.3 REST API
├── docker-compose.yml # PostgreSQL + pgAdmin
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Java 21+ (JDK)
- Node.js 18+
- PostgreSQL 16+ (or Docker)

### 1. Start Database
```bash
docker-compose up -d
```

### 2. Start Backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend runs at: `http://localhost:8080`

### 3. Start Frontend
```bash
cd frontend
npm install
ng serve
```
Frontend runs at: `http://localhost:4200`

## 🔑 Features

### Core
- ✅ User registration with comprehensive validation
- ✅ JWT authentication with refresh tokens
- ✅ Role-based access (DONOR, REQUESTER, HOSPITAL, ADMIN)
- ✅ Blood request creation and management
- ✅ Smart donor matching with compatibility scoring
- ✅ Real-time WebSocket notifications
- ✅ Interactive map with nearby donors

### Advanced
- 🔥 Auto-expanding donor search radius
- 🔥 Emergency priority levels (NORMAL, URGENT, CRITICAL)
- 🔥 Donor eligibility and cooldown validation
- 🔥 Hospital dashboard with inventory
- 🔥 Admin analytics dashboard
- 🔥 Dark/Light mode
- 🔥 Mobile-responsive design
- 🔥 Audit logging

## 🔐 API Endpoints

See `backend/README.md` for complete API documentation.

## ⚠️ Disclaimer

Drop4Life is a **donor-matching platform**, NOT a medical service or blood bank. Final donation eligibility is determined by qualified medical staff. In case of medical emergency, call **112** (India) immediately.

## 📄 License

MIT License
