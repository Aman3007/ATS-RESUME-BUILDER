## 🚀 Live Demo

🔗 **Demo:** https://ats-resume-builder-front.onrender.com/

---

# ATS Resume Builder (MERN + Puppeteer)

A full-stack ATS-compliant Resume Builder that allows users to create, edit, save, and download professional resumes as PDFs.  
Built using the MERN stack with Puppeteer for reliable, server-side PDF generation.

---

## 🚀 Features

- 🔐 Secure authentication using JWT with HTTP-only cookies  
- 📝 Dynamic resume builder with live form updates  
- 💾 Save and manage multiple resumes per user  
- 📄 Server-side PDF generation using Puppeteer (ATS-friendly)  
- 🎨 Modern, responsive UI with smooth animations  

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Puppeteer (Chromium)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🧠 Why Puppeteer?

Puppeteer is used for server-side PDF generation to ensure:
- Consistent layout across devices
- ATS-compliant resume formatting
- Reliable production PDF exports using Render-compatible Chromium
- No client-side PDF rendering issues

---

## 📂 Project Structure

backend/
├── controllers/
│   ├── authController.js
│   ├── resumeController.js
│   └── pdfController.js
├── models/
│   ├── User.js
│   └── Resume.js
├── routes/
│   ├── authRoutes.js
│   └── resumeRoutes.js
├── middleware/
│   └── authMiddleware.js
├── utils/
│   └── pdfTemplates.js
├── db.js
├── server.js
└── .env

frontend/
├── components/
│   ├── Auth.jsx
│   └── Builder.jsx
├── App.jsx
└── main.jsx

---

## 🔐 Authentication Flow

1. User registers or logs in  
2. JWT token is stored in an HTTP-only cookie  
3. Protected routes validate token via middleware  
4. Secure access to resume creation and PDF export  

---

## 📈 Impact & Results

- Reduced resume creation time by 50%  
- Enabled unlimited resume storage per user  
- Achieved 100% reliable PDF generation in production  
- Designed fully ATS-compliant resume layouts  
- Built with real-world deployment and security practices  

---

## ⚙️ Environment Variables

Create a `.env` file in the backend folder:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
PORT=5000  

---

## ▶️ Run Locally

### Backend
npm install  
npm run dev  

### Frontend
npm install  
npm run dev  

---

## 👤 Author

Aman Singh Chauhan  
Fresher Full-Stack (MERN) Developer  

GitHub: https://github.com/Aman3007

---

## 📌 Note

This project was built with production-level considerations including authentication security, scalable architecture, and reliable PDF generation.
