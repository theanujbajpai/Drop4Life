# 🩸 Drop4Life Frontend (Angular 18)

Production-ready healthcare blood donation UI built with Angular 18 and Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
# or
ng serve
```
Open `http://localhost:4200` in your browser.

### 3. Build for Production
```bash
npm run build
```
The production bundle will be generated in `dist/frontend/browser`.

---

## 🔑 Key Features
- **Smart Donor Matching**: Leaflet map showing compatible donors with biological match percentage, distance in km, and tier proximity (0-5km, 5-15km, etc.).
- **Live Emergency System**: One-tap emergency broadcast triggering real-time WebSocket STOMP notifications to compatible donors.
- **Multi-Role Dashboards**:
  - `Donor Dashboard`: Availability toggle, nearby emergency request alerts, cooldown tracker, donation history.
  - `Requester Dashboard`: Active requests, secured units progress bar, donor responses count.
  - `Hospital Dashboard`: Live blood inventory by blood group, requisition management.
  - `Admin Dashboard`: Platform analytics, requests by blood group, security audit trail.
- **Deep Validations**: Indian 10-digit mobile, 6-digit pincode, medical eligibility (weight ≥ 45kg, age 18-65), cooldown days, strong password criteria.
- **Rich Aesthetics**: Dark / Light mode toggle, health-tech glassmorphism, responsive mobile drawer menu, custom toast alerts.

---

## 🏥 Test Accounts (Pre-configured in Backend)
- **Donor (B+)**: `rahul.sharma@gmail.com` / `Password@123`
- **Donor (O-)**: `priya.patel@gmail.com` / `Password@123`
- **Requester**: `sunita.gupta@gmail.com` / `Password@123`
- **Admin**: `admin@drop4life.com` / `Password@123`
