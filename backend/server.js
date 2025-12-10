const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();


const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
   origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//  MongoDB Connection
connectDB();
//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

// general Check Route (Optional)
app.get("/", (req, res) => {
  res.send(" Resume Builder API Running");
});



//  Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
