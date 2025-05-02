# 🖼️ Art Gallery Application

A full-stack CRUD application for managing artworks, built with React, Node.js, Express, and MongoDB (in-memory). Features an ancient visual theme and interactive UI for creating, viewing, editing, and deleting artworks.

---

## 🚀 How to Run This Project Locally

### ✅ Prerequisites
- Node.js (v16 or newer)
- npm (comes with Node.js)

> No need to install MongoDB — the app uses `mongodb-memory-server`.

---

## 📁 Project Structure

```
project-root/
├── client/           # React frontend
├── server/           # Node/Express backend
│   ├── public/       # Contains about.html and static files
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   ├── seed.js       # Seeds initial data
│   ├── Artworks.json # Art data for seeding
│   └── server.js     # Backend entry point
```

---

## 🧩 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd project-root
```

---

### 2. Install and Start Backend

```bash
cd server
npm install
node server.js
```

- Express runs on `http://localhost:3001`
- MongoDB runs in-memory
- `Artworks.json` is auto-seeded
- `/about.html` is served statically

---

### 3. Install and Start Frontend (React)

Open a second terminal:

```bash
cd client
npm install
npm start
```

- Opens `http://localhost:3000`

---

## ✅ Summary of Commands

```bash
# Backend
cd server
npm install
node server.js

# Frontend (in separate terminal)
cd client
npm install
npm start
```

---

## 🔍 Notes for Examiner

- Runs completely offline (in-memory database)
- No external DB or services needed
- `/about.html` explains how the system works
- Designed by **Yinka Adebesin**
