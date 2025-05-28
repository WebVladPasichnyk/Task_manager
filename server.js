// server.js
require("dotenv").config();               // ← load .env immediately
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes   = require("./routes/authRoutes");
const userRoutes   = require("./routes/userRoutes");
const taskRoutes   = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Log URI for debugging (redact credentials if pasting logs publicly)
console.log("→ Connecting to MongoDB at:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin:      process.env.CLIENT_URL || "*",
    methods:     ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/auth",    authRoutes);
app.use("/api/users",   userRoutes);
app.use("/api/tasks",   taskRoutes);
app.use("/api/reports", reportRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
