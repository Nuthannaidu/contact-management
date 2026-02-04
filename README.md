# 📇 Contact Management App (MERN Stack)

[![Frontend Deploy](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)](https://contact-management-9bjnqaftw-siddus-projects-320cc678.vercel.app)
[![Backend Deploy](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://contact-management-1lci.onrender.com)
[![Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](https://github.com/Nuthannaidu/contact-management)

A full-stack **Contact Management Application** built using the **MERN stack**.
The application allows users to securely register, log in, and manage their personal contacts with a modern and responsive user interface.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://contact-management-9bjnqaftw-siddus-projects-320cc678.vercel.app]([https://contact-management-9bjnqaftw-siddus-projects-320cc678.vercel.app)
](https://contact-management-1-1fpw.onrender.com/login)
- **Backend (Render):** [https://contact-management-1lci.onrender.com](https://contact-management-1lci.onrender.com)

---

## ✨ Features

### Authentication
- User registration and login
- Secure password hashing using **bcrypt**
- **JWT-based** authentication
- Protected routes
- Logged-in user’s real name displayed on the dashboard
- Each user can access only their own contacts

### Contact Management
- Add new contacts
- View all contacts
- View contact details in a popup modal
- Edit contacts
- Delete contacts
- Search contacts by name
- **Optional fields:** Email, Company, Notes

### Validation & Security
- Frontend validation for required fields
- Phone number restricted to **exactly 10 digits**
- Backend validation using **Mongoose**
- JWT authorization headers
- Proper error handling and HTTP status codes

### UI & UX
- Modern **glassmorphism** UI
- **Tailwind CSS** styling
- Fully responsive (mobile and desktop)
- Smooth animations and transitions
- Clean and professional dashboard layout

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Vite
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- CORS

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

---

## 📁 Project Structure

```text
contact-management  
│  
├── backend  
│   ├── controllers  
│   │   ├── authController.js  
│   │   └── contactController.js  
│   ├── models  
│   │   ├── User.js  
│   │   └── Contact.js  
│   ├── routes  
│   │   ├── authRoutes.js  
│   │   └── contactRoutes.js  
│   ├── middleware  
│   │   └── authMiddleware.js  
│   ├── config  
│   │   └── db.js  
│   └── server.js  
│  
├── frontend  
│   ├── src  
│   │   ├── pages  
│   │   │   ├── Login.jsx  
│   │   │   ├── Register.jsx  
│   │   │   └── Dashboard.jsx  
│   │   ├── components  
│   │   │   ├── ContactForm.jsx  
│   │   │   ├── ContactList.jsx  
│   │   │   ├── ContactViewModal.jsx  
│   │   │   └── SearchBar.jsx  
│   │   ├── App.jsx  
│   │   ├── main.jsx  
│   │   └── index.css  
│   └── package.json  
│  
└── README.md
```

## 🗄 Database Design

### User Schema

| Field    | Type   | Description        |
|----------|--------|--------------------|
| name     | String | Required           |
| email    | String | Required, Unique   |
| password | String | Hashed             |
### Contact Schema

| Field      | Type     | Description                          |
|------------|----------|--------------------------------------|
| userId     | ObjectId | Reference to User                    |
| name       | String   | Required, minimum 2 characters       |
| phone      | String   | Required, exactly 10 digits          |
| email      | String   | Optional                             |
| company    | String   | Optional                             |
| notes      | String   | Optional                             |
| createdAt | Date     | Timestamp                            |
| updatedAt | Date     | Timestamp                            |

## 🔗 API Documentation

### Authentication APIs

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | /api/auth/register  | Register a new user              |
| POST   | /api/auth/login     | Login user and return JWT        |

### Contacts APIs (Protected)

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | /api/contacts         | Get all contacts      |
| POST   | /api/contacts         | Add a new contact     |
| PUT    | /api/contacts/:id     | Update a contact      |
| DELETE | /api/contacts/:id     | Delete a contact      |
## ⚙️ Installation & Setup

### Prerequisites

| Requirement | Description |
|------------|-------------|
| Node.js    | JavaScript runtime |
| MongoDB   | NoSQL database |
| npm        | Package manager |

---

### Backend Setup

| Step | Command / Details |
|-----|------------------|
| Navigate to backend | `cd backend` |
| Install dependencies | `npm install` |
| Create `.env` file | See below |
| Start server | `npm run dev` |

**Backend Environment Variables (`.env`):**

| Variable | Description |
|--------|-------------|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT |
| PORT | Server port (5000) |

---

### Frontend Setup

| Step | Command / Details |
|-----|------------------|
| Navigate to frontend | `cd frontend` |
| Install dependencies | `npm install` |
| Create `.env` file | See below |
| Start frontend | `npm run dev` |

**Frontend Environment Variables (`.env`):**

| Variable | Description |
|---------|-------------|
| VITE_URL_API | Backend base URL |




