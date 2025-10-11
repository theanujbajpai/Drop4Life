# 🩸 Drop4Life – Smart Blood Donation & Request Platform

**Author:** 🧑‍💻 *Anuj Bajpai*  
**Version:** 1.0  
**License:** MIT  
**GitHub Repo:** [github.com/anujbajpai/Drop4Life](https://github.com/anujbajpai/Drop4Life)

---

## 🧭 Overview

**Drop4Life** is an intelligent and user-friendly web application designed to **connect blood donors and recipients** efficiently.  
It bridges the gap between **donors, patients, and hospitals** by providing a **real-time blood request and donation management system**.  

The project was built with the goal of **saving lives** through **technology**, by simplifying the process of finding and donating blood.  
Whether you are a **donor**, **recipient**, or **admin**, Drop4Life provides all the tools you need in one unified platform. ❤️

---

## 🌟 Key Features

🚨 **Instant Blood Requests** – Users can post urgent blood requirements with just a few clicks.  
🩸 **Smart Donor Matching** – Automatically matches recipients with nearby donors based on blood group and location.  
🔐 **Secure Authentication** – Secure user login using encrypted credentials and JWT.  
📅 **Donation History** – Track your past donations, requests, and responses.  
🗺️ **Location-Based Search** – Filter and locate donors or hospitals by city and pin code.  
🧑‍💼 **Admin Panel** – Manage all donors, requests, and system data efficiently.  
📢 **Email & Notification Alerts** – Automatic alerts to registered donors in case of emergency requests.  
💾 **Cloud Database Integration** – Uses MongoDB Atlas for high performance and scalability.  
📱 **Responsive UI** – Works smoothly on desktop, tablet, and mobile screens.

---

## 🏗️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React.js ⚛️, Tailwind CSS 🎨, Axios 🌐 |
| **Backend** | Node.js 🚀, Express.js 🧩 |
| **Database** | MongoDB 🍃 |
| **Authentication** | JWT Tokens 🔒, Bcrypt for password hashing |
| **Cloud & Deployment** | Render / Vercel / MongoDB Atlas ☁️ |
| **Version Control** | Git & GitHub 🧭 |

---

## 🧩 System Architecture

```
Frontend (React.js)
        ↓
Backend API (Express.js + Node.js)
        ↓
Database (MongoDB Atlas)
        ↓
Notifications (Email + Alerts)
```

The architecture ensures **modular scalability** and **real-time responsiveness** using RESTful APIs.

---

## 📂 Folder Structure

```
Drop4Life/
├── backend/                 # Node.js + Express server
│   ├── models/              # Database schemas
│   ├── routes/              # API routes (auth, donor, request)
│   ├── controllers/         # Request handling logic
│   ├── config/              # Database and environment setup
│   └── server.js            # App entry point
│
├── frontend/                # React-based user interface
│   ├── src/
│   │   ├── components/      # UI components (cards, forms, navbar)
│   │   ├── pages/           # User, donor, and admin pages
│   │   ├── utils/           # API helpers and config
│   │   └── App.js           # Main component
│   └── public/
│
├── assets/                  # Images, logos, icons
├── docs/                    # Documentation and screenshots
└── README.md                # You are here 🙂
```

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally 👇

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/anujbajpai/Drop4Life.git
cd Drop4Life
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
# Add your .env file with MONGO_URI, JWT_SECRET, and PORT
npm start
```

### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4️⃣ Open in Browser
Visit 👉 **http://localhost:5173/** (or your dev port) to access Drop4Life.

---

## 🧠 How It Works

1. **User Registration/Login** 🔐 – Donors and recipients create secure accounts.  
2. **Post Blood Request** 🩸 – A patient posts the requirement with blood group and location.  
3. **Donor Search** 🔍 – The system finds nearby donors and notifies them automatically.  
4. **Response & Communication** 💬 – Donors can respond and confirm donations.  
5. **Admin Supervision** 🧑‍💼 – Admin monitors activity, validates users, and manages data.  

---

## 📸 Screenshots (Sample)

| Section | Preview |
|----------|----------|
| 🏠 Home Page | *Shows project intro and navigation* |
| 🧍 Donor Dashboard | *List of donors and requests* |
| 🩸 Request Page | *Form to create a new blood request* |
| 🔐 Login / Signup | *User authentication interface* |
| 🧑‍💼 Admin Panel | *Manage users, requests, and donations* |

*(Add screenshots inside `/docs/screenshots` folder)*

---

## 🚀 Future Enhancements

- 📍 **Google Maps Integration** – Live donor tracking  
- 📱 **Mobile App (React Native)** – Native Android/iOS version  
- 🤖 **AI Health Insights** – Smart recommendations for donors  
- 🩹 **Hospital Partner Module** – For verified hospital-based blood drives  
- 💬 **Live Chat Feature** – Real-time donor-recipient communication  

---

## 🧑‍💻 Developer Information

**Developed & Maintained by:**  
👨‍💻 **Anuj Bajpai**  
💼 Full Stack Developer | Innovator | Problem Solver  
🌐 [LinkedIn](https://linkedin.com/in/anujbajpai) | [GitHub](https://github.com/anujbajpai)

> “Drop4Life is not just a project — it’s a mission to save lives through code.” ❤️

---

## 📜 License

This project is licensed under the **MIT License** – you’re free to use, modify, and distribute it for learning or open-source contributions.

---

### ⭐ Don’t forget to star the repo if you like it!  
> Your support helps keep this initiative alive 🩸✨
