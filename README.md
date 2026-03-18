# 🧑‍💼 Career Code — Job Portal Website

A full-stack job portal web application built with the **MERN stack**, where employers can post job listings and job seekers can browse, search, and apply for jobs seamlessly.

🌐 **Live Demo:** [carrer-code-client.vercel.app](https://carrer-code-client.vercel.app)
📦 **Repository:** [github.com/mesbahtoha/Job-Portal-Website](https://github.com/mesbahtoha/Job-Portal-Website)

---

## 🚀 Features

### For Job Seekers
- 🔍 Browse and search job listings by title, location, or category
- 📄 View detailed job descriptions and requirements
- ✅ Apply for jobs with a single click
- 👤 Create and manage personal profile

### For Employers / Recruiters
- 📝 Post new job listings
- 📋 Manage and update existing job posts
- 👥 Review applicants for each job

### General
- 🔐 User authentication (Register / Login) with JWT
- 🛡️ Role-based access control (Job Seeker & Employer)
- 📱 Fully responsive design
- ⚡ Fast and optimized REST API

---

## 🛠️ Tech Stack

### Frontend (`carrer-code-client`)
| Technology | Purpose |
|---|---|
| React.js | UI Library |
| React Router DOM | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| Context API | State management |

### Backend (`carrer-code-server`)
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JSON Web Token (JWT) | Authentication |
| bcrypt.js | Password hashing |
| dotenv | Environment variables |
| CORS | Cross-origin resource sharing |

---

## 📁 Project Structure

```
Job-Portal-Website/
│
├── carrer-code-client/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static assets
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── context/            # Auth & global state
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── carrer-code-server/         # Node.js + Express backend
│   ├── config/                 # DB configuration
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Auth & error middleware
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API route definitions
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 1. Clone the Repository

```bash
git clone https://github.com/mesbahtoha/Job-Portal-Website.git
cd Job-Portal-Website
```

---

### 2. Setup the Backend

```bash
cd carrer-code-server
npm install
```

Create a `.env` file in the `carrer-code-server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm start
# or for development with hot-reload:
npm run dev
```

The backend will run at: `http://localhost:5000`

---

### 3. Setup the Frontend

```bash
cd ../carrer-code-client
npm install
```

Create a `.env` file in the `carrer-code-client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Job Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all job listings |
| GET | `/api/jobs/:id` | Get single job by ID |
| POST | `/api/jobs` | Create a new job (Employer only) |
| PUT | `/api/jobs/:id` | Update a job (Employer only) |
| DELETE | `/api/jobs/:id` | Delete a job (Employer only) |

### Application Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Apply for a job |
| GET | `/api/applications/me` | Get current user's applications |

---

## 🌍 Deployment

### Frontend — Vercel
The client is deployed on **Vercel**:
1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Set root directory to `carrer-code-client`
3. Add environment variables in Vercel dashboard
4. Deploy 🚀

### Backend — Render / Railway
For the server, use [Render](https://render.com) or [Railway](https://railway.app):
1. Connect your GitHub repo
2. Set root directory to `carrer-code-server`
3. Add environment variables
4. Set start command to `node index.js`
5. Deploy 🚀

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request


---


## 👨‍💻 Author

**Md.Mesbahul Alam Toha**
- GitHub: [@mesbahtoha](https://github.com/mesbahtoha)
- Live Project: [carrer-code-client.vercel.app](https://carrer-code-client.vercel.app)

---

> ⭐ If you found this project helpful, please give it a star!
