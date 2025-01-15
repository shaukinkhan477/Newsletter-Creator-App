require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json()); // for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Newsletter App - Authentication Service Running");
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
