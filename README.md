✅ ATS RESUME BUILDER – Full Stack Application
Live link : https://ats-resume-builder-front.onrender.com/

A full-stack ATS-friendly Resume Builder that allows users to:

Register & Login securely

Create, edit, delete resumes

Choose resume templates

Download resumes as PDF

Store data securely in MongoDB

Deployed using Render

🚀 Live Features

✅ User Authentication (Register / Login / Logout)

✅ JWT + Cookie-based Security

✅ Resume Builder Form

✅ Dynamic Skills, Experience, Education Fields

✅ Multiple Resume Templates

✅ PDF Download (Server-side generated)

✅ Secure Database Storage

✅ Fully Responsive UI

✅ Deployed on Render (Production Ready)

🧠 Tech Stack
🔷 Frontend

React.js

Axios – API requests

Framer Motion – animations

Lucide React Icons

Tailwind CSS – UI styling

🔷 Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcryptjs

cookie-parser

dotenv

🔷 PDF Generation

puppeteer-core

@sparticuz/chromium (Render-compatible browser)

Custom HTML Resume Templates

🔷 Deployment

Render

📁 Project Structure
ATS-RESUME-BUILDER/

│

├── backend/

│   ├── controllers/

│   │   ├── authController.js

│   │   ├── resumeController.js

│   │   └── pdfController.js

│   │

│   ├── models/

│   │   ├── User.js

│   │   └── Resume.js

│   │

│   ├── routes/

│   │   ├── authRoutes.js

│   │   └── resumeRoutes.js

│   │

│   ├── middleware/

│   │   └── authMiddleware.js

│   │

│   ├── utils/

│   │   └── pdfTemplates.js

│   │

│   ├── db.js

│   ├── server.js

│   └── .gitignore

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   │   ├── Auth.jsx

│   │   │   └── Builder.jsx

│   │   │

│   │   ├── App.jsx

│   │   └── main.jsx

│
└── README.md

🔐 Authentication Flow

User registers with:

Name

Email

Password (encrypted with bcrypt)

On login:

JWT token is generated

Token stored in HTTP-only cookie

All resume routes are protected using:

authMiddleware.js

📝 Resume Features

Personal Details

Unlimited Skills

Multiple Experience Entries

Multiple Education Entries

Resume stored in MongoDB

Each user sees only their own resumes

📄 PDF Generation System

Resume data converted into HTML using:

pdfTemplates.js

HTML → PDF using:

puppeteer-core

@sparticuz/chromium (Render compatible)

PDF returned as downloadable file

▶️ Run Locally (Development)
1️⃣ Backend

cd backend
npm install
npm run dev

2️⃣ Frontend

cd frontend
npm install
npm run dev

🛡️ Security Implementations

Password Hashing (bcrypt)

JWT Authentication

HTTP-only Cookies

Protected API Routes

User Resume Isolation

🧪 Tested Functionalities

✅ Login / Register

✅ Create Resume

✅ Update Resume

✅ Delete Resume

✅ Download PDF

✅ Logout

✅ Reload Session Persistence
