require('dotenv').config(); // Load .env in local development

const express = require('express');
const app = express();
const cors = require('cors');
const connectdb = require('./db');

const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const user_routes = require('./routes/userroutes');
const blog_routes = require('./routes/blogroutes');

// Connect to DB and start server
connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.status(200).send("🚀 Radhe Krishna - Server is Live!");
});

// Route endpoints
app.use('/app/v1/user', user_routes);
app.use('/app/v1/blog', blog_routes);
