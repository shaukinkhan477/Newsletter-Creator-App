require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

// Load our Passport config (Google OAuth)
require("./config/passport");

const startCronJob = require("./cron");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const subscriberRoutes = require("./routes/subscriber.routes");


const app = express();

// Connect MongoDB
connectDB();

// Start the cron job
startCronJob();


// Middleware
app.use(cookieParser());
app.use(express.json()); // for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);

// Post routes (newsletter)
app.use('/api/posts', postRoutes);

// Subscriber routes
app.use('/api/subscribers', subscriberRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Newsletter App - Authentication Service Running");
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
