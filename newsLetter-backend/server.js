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

// This pulls in and applies your GraphQL server
const applyGraphQL = require('./graphql');

// OpenAPI/Swagger integration
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


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

// REST Routes

// Auth Routes
app.use("/api/auth", authRoutes);

// Post routes (newsletter)
app.use('/api/posts', postRoutes);

// Subscriber routes
app.use('/api/subscribers', subscriberRoutes);


// Serve OpenAPI docs
try {
  const openapiPath = path.join(__dirname, 'docs', 'openapi.yaml');
  const openapiDocument = yaml.load(fs.readFileSync(openapiPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
} catch (err) {
  console.error("Failed to load OpenAPI document:", err);
}

// Basic route
app.get("/", (req, res) => {
  res.send("Newsletter App - Authentication Service Running");
});


// Function to start the Apollo GraphQL server and integrate with Express
async function startServer() {
  await applyGraphQL(app);
 

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
    console.log(`OpenAPI docs available at http://localhost:${PORT}/api-docs`);
  });
}

startServer();

// Listen
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
