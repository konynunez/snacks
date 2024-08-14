// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Create an express application
const app = express();

// Define a port
const PORT = 4000;

// DATA
const SNACKS = [
  {
    id: 1,
    name: "Chips",
    description: "Crunchy and salty potato chips.",
    price: 2.99,
    category: "Salty Snacks",
    inStock: true,
  },
  {
    id: 2,
    name: "Chocolate Bar",
    description: "Rich and creamy milk chocolate bar.",
    price: 1.49,
    category: "Sweet Snacks",
    inStock: true,
  },
  {
    id: 3,
    name: "Popcorn",
    description: "Buttery and fluffy popcorn.",
    price: 3.49,
    category: "Salty Snacks",
    inStock: false,
  },
  {
    id: 4,
    name: "Gummy Bears",
    description: "Colorful and chewy gummy bears.",
    price: 2.19,
    category: "Sweet Snacks",
    inStock: true,
  },
  {
    id: 5,
    name: "Pretzels",
    description: "Crispy and twisted pretzels.",
    price: 2.79,
    category: "Salty Snacks",
    inStock: true,
  },
  {
    id: 6,
    name: "Granola Bar",
    description: "Healthy and crunchy granola bar.",
    price: 1.99,
    category: "Healthy Snacks",
    inStock: true,
  },
  {
    id: 7,
    name: "Fruit Snacks",
    description: "Sweet and fruity gummy snacks.",
    price: 2.49,
    category: "Sweet Snacks",
    inStock: false,
  },
  {
    id: 8,
    name: "Nuts Mix",
    description: "A mix of roasted and salted nuts.",
    price: 4.99,
    category: "Healthy Snacks",
    inStock: true,
  },
  {
    id: 9,
    name: "Energy Bar",
    description: "High-protein energy bar.",
    price: 2.59,
    category: "Healthy Snacks",
    inStock: true,
  },
  {
    id: 10,
    name: "Rice Crackers",
    description: "Light and crispy rice crackers.",
    price: 3.19,
    category: "Healthy Snacks",
    inStock: false,
  },
];

// Use CORS Middleware
app.use(cors());

// Use JSON middleware to parse request bodies
app.use(express.json());

// Define our middleware functions for logging
app.use((request, response, next) => {
  console.log(`${request.method} request for ${request.url}`);
  next();
});

// Define our routes
// Create a simple route
app.get("/", (request, response) => {
  response.send("Hello, world!");
});

//fetching snacks
app.get("/snacks", (request, response, next) => {
  try {
    response.status(200).json(SNACKS); // Set response status to 200 (OK)
  } catch (error) {
    next(error);
  }
});

// Fetching snack by ID
app.get('/snacks/:id', (request, response, next) => {
  try {
    const foundSnack = SNACKS.find((value) => {
      return value.id === parseInt(request.params.id);
    });

    if (foundSnack) {
      response.status(200).json(foundSnack);
    } else {
      response.status(404).json({ message: "Snack not found." });
    }
  } catch (error) {
    next(error);
  }
});

// Error Handling
// Generic error handling middleware
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send("Something broke!");
  errorStack: error.stack;
  errorMessage: error.message;
});

// Handling 404 errors for unmatched routes
app.use((request, response, next) => {
  response.status(404).json({
    message: "Resource not found. Are you sure you're looking in the right place?",
  });
});

// Make the server listen on our port
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
