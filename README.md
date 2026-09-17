# Full-Stack Personal Portfolio Website

A modern, responsive, full-stack personal portfolio application built with **React.js**, **Node.js/Express.js**, and **MySQL** (with seamless **MongoDB** / in-memory compatibility).

![Tech Stack](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?logo=react)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js)
![Database](https://img.shields.io/badge/Database-MySQL%20%2F%20MongoDB-4479A1?logo=mysql)
![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%2F%20Render-000000?logo=vercel)

---

## 🌟 Key Features

- **Dynamic Hero Section**: Interactive call-to-action buttons, animated code showcase card, resume download link, and direct social profiles (GitHub, LinkedIn, Email).
- **About Me & Statistics**: Engineering philosophy, core specializations, and career highlight metrics.
- **Categorized Skills Grid**: Grouped into Frontend, Backend, Databases, and DevOps/Tools with proficiency badges and Lucide icons.
- **Interactive Projects Showcase**:
  - Filter by category: *All*, *Full Stack*, *Frontend*, *Backend*, *Mobile*.
  - Starred *Featured* project badges.
  - Project Details Modal with architecture highlights, tech tags, live demo, and source code links.
  - Dynamic loading from backend REST API.
- **Experience & Education Timeline**: Chronological journey of engineering roles and education.
- **Database-Backed Contact Form**:
  - Validated contact form connected to `POST /api/contact`.
  - Inquiries are stored directly in the database (`contacts` table).
  - Real-time feedback messages upon successful submission.
- **Admin CMS Panel (`/admin` or top navigation button)**:
  - Protected with admin passcode (`admin123`).
  - Add, edit, or delete projects in real-time.
  - Add or delete tech stack skills.
  - View and manage incoming contact inquiries.
- **Self-Healing & Auto-Migrating Database**:
  - Automatically creates database `portfolio_db` and tables (`projects`, `skills`, `experiences`, `contacts`).
  - Auto-seeds starter data on first launch.
  - Includes a fallback in-memory store so the app works out-of-the-box even before database credentials are entered.

---

## 🏗️ Project Architecture

```
Personal Portfolio website/
├── client/                     # React Frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Navbar, Hero, About, Skills, Projects,
│   │   │                       # ProjectModal, Experience, Contact, AdminModal, Footer
│   │   ├── services/api.js     # Axios REST API client
│   │   ├── App.jsx             # Root layout and data synchronization
│   │   ├── index.css           # Tailwind directives & glassmorphism classes
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js          # Vite config with API proxy
│   └── tailwind.config.js
│
├── server/                     # Node.js + Express REST API
│   ├── config/db.js            # MySQL connection pool, auto-migration & fallback
│   ├── routes/
│   │   ├── projects.js         # /api/projects (CRUD)
│   │   ├── skills.js           # /api/skills (CRUD)
│   │   ├── contact.js          # /api/contact (POST inquiry & admin GET)
│   │   └── experience.js       # /api/experience
│   ├── scripts/seedData.js     # Starter projects and skills seed data
│   ├── .env                    # Environment variables (DB credentials)
│   ├── package.json
│   └── server.js               # Express entry point & static SPA server
│
├── package.json                # Root automation scripts
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** v18+ installed (`node -v`)
- **MySQL Server** (Optional for local persistence; app will auto-fallback if credentials are not configured)

---

### Step 1: Clone or Navigate to Project
```bash
cd "e:/Projects/Internship/Personal Portfolio website"
```

### Step 2: Configure Database Credentials (MySQL)
Open `server/.env` and update your MySQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
ADMIN_KEY=admin123
```
> **Note**: If your MySQL `root` user has a password, enter it in `DB_PASSWORD`. If left blank or incorrect, the server gracefully activates its built-in in-memory database so you can still test everything immediately!

### Step 3: Run the Application

#### Option A: Unified Full-Stack Run (One Command)
```bash
# Start backend and serve the built client
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser!

#### Option B: Independent Development Mode (Hot-Reloading)

1. **Start Backend Server**:
   ```bash
   cd server
   npm run dev
   ```
   Backend runs at `http://localhost:5000`.

2. **Start Frontend Dev Server (in another terminal)**:
   ```bash
   cd client
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service & database connectivity status |
| `GET` | `/api/projects` | List all projects (supports `?category=Frontend`) |
| `POST` | `/api/projects` | Create a new project (Admin) |
| `PUT` | `/api/projects/:id` | Update project details (Admin) |
| `DELETE` | `/api/projects/:id` | Remove a project (Admin) |
| `GET` | `/api/skills` | List all skills grouped by category |
| `POST` | `/api/skills` | Add new skill (Admin) |
| `DELETE` | `/api/skills/:id` | Remove skill (Admin) |
| `GET` | `/api/experience` | Fetch experience & education timeline |
| `POST` | `/api/contact` | Submit contact form inquiry |
| `GET` | `/api/contact` | Retrieve all submitted messages (Admin) |
| `DELETE` | `/api/contact/:id` | Delete a contact message (Admin) |

---

## ☁️ Deployment Guide

### 1. Frontend on Vercel or Netlify
1. Push your code to GitHub.
2. In **Vercel** or **Netlify**, import the repository.
3. Configure the build settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Environment Variable:
   - `VITE_API_URL`: `https://your-backend-service.onrender.com/api`

### 2. Backend on Render or Railway
1. In **Render**, create a new **Web Service**.
2. Set Root Directory to `server`.
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add Environment Variables from `server/.env`:
   - `PORT`: `5000`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (from a free cloud MySQL provider like Aiven, TiDB Cloud, or PlanetScale, or a free MongoDB Atlas connection string).

---

## 🛡️ Admin CMS Access
- Click the **"Admin CMS"** button in the top navbar or visit the modal.
- Enter passcode: `admin123`
- You can dynamically add new projects, update skills, and view inquiries live.
