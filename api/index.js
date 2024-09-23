//Import Dotenv
require("dotenv").config();

// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Import Axios
const axios = require("axios");

// Import our Supabase Instance
const supabase = require("../supabaseInstance");

// Import our route functions
const getAll = require("./routes/getAll");
const getById = require("./routes/getById");
const deleteById = require("./routes/deleteById");
const updateById = require("./routes/updateById");
const addItem = require("./routes/addItem");
const docs = require("./routes/docs");

// Create an express application
const app = express();

// Define a port
const PORT = 4000;

// Use CORS Middleware
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Use JSON middleware to parse request bodies
app.use(express.json());

// Middleware for API key security
app.use((request, response, next) => {
  const apiKey = request.headers["api-key"];

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return response.status(403).json({
      message:
        "ACCESS DENIED! You need an API key for that. See our administrators",
    });
  }
  next();
});

// Define our Route
// Home Route
app.get("/", (request, response, next) => {
  response.json(docs);
});

// Route to Get all supabase snacks
app.get("/snacks", getAll);

// Get a single snack by ID from supabase
app.get("/snacks/:id", getById);

// Route to delete a single snack by ID
app.delete("/snacks/:id", deleteById);

// Add a new snack to Supabase
app.post("/snacks", addItem);

// Update an existing snack by ID in Supabase
app.put("/snacks/:id", updateById);

app.patch("/snacks/:id", updateById);

// Error Handling
// Generic error handling middleware
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json({
    error: "Something Broke!",
    errorStack: error.stack,
    errorMessage: error.message,
  });
});

// 404 Resource not found error handling
app.use((request, response, next) => {
  response.status(404).json({
    error:
      "Resource not found. Are you sure you're looking in the right place?",
  });
});

// Start the server and assign it to the `server` variable
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

// Export the app and server for testing
module.exports = app;
