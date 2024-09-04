//Import Dotenv
require('dotenv').config();

// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Import Axios
const axios = require("axios");

// Create an express application
const app = express();

const supabase = require('./supabaseInstance');

// Define a port
const PORT = 4000;

// DATA
const SNACKS = [
  {
    "id": 1,
    "name": "Chips",
    "description": "Crunchy and salty potato chips.",
    "price": 2.99,
    "category": "Salty Snacks",
    "inStock": true
  },
  {
    "id": 2,
    "name": "Chocolate Bar",
    "description": "Rich and creamy milk chocolate bar.",
    "price": 1.49,
    "category": "Sweet Snacks",
    "inStock": true
  },
  {
    "id": 3,
    "name": "Popcorn",
    "description": "Buttery and fluffy popcorn.",
    "price": 3.49,
    "category": "Salty Snacks",
    "inStock": false
  },
  {
    "id": 4,
    "name": "Gummy Bears",
    "description": "Colorful and chewy gummy bears.",
    "price": 2.19,
    "category": "Sweet Snacks",
    "inStock": true
  },
  {
    "id": 5,
    "name": "Pretzels",
    "description": "Crispy and twisted pretzels.",
    "price": 2.79,
    "category": "Salty Snacks",
    "inStock": true
  },
  {
    "id": 6,
    "name": "Granola Bar",
    "description": "Healthy and crunchy granola bar.",
    "price": 1.99,
    "category": "Healthy Snacks",
    "inStock": true
  },
  {
    "id": 7,
    "name": "Fruit Snacks",
    "description": "Sweet and fruity gummy snacks.",
    "price": 2.49,
    "category": "Sweet Snacks",
    "inStock": false
  },
  {
    "id": 8,
    "name": "Nuts Mix",
    "description": "A mix of roasted and salted nuts.",
    "price": 4.99,
    "category": "Healthy Snacks",
    "inStock": true
  },
  {
    "id": 9,
    "name": "Energy Bar",
    "description": "High-protein energy bar.",
    "price": 2.59,
    "category": "Healthy Snacks",
    "inStock": true
  },
  {
    "id": 10,
    "name": "Rice Crackers",
    "description": "Light and crispy rice crackers.",
    "price": 3.19,
    "category": "Healthy Snacks",
    "inStock": false
  }
]

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
// Home 
app.get("/", (request, response) => {
  response.json({hello: "World!"});
});


// Route to Get all supabase snacks
app.get("/snacks", async (request, response, next) => {
  try {
    // response.json(SNACKS);
    const res = await supabase.get("/snacks");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
});

// Get a single snack from supabase
app.get("/snacks/:id", async (request, response, next) => {
  try {

    const res = await supabase.get(`/snacks?id=eq.${request.id}`);

    //error handling
    if (!response.data.length) {
      return response.status(404).json({ message: "Snack does not exist!"});
    }
  
//send snack object
    response.json(data[0]);
  } catch (error) {
    next(error);
  }
});
      
      
//route to delete a single snack by id
app.delete('/snacks/:id', async (request, response, next) => {
  try {
    const res = await supabase.delete(`/snacks?=eq.${request.params.id}`);
    response.status(204).send();

  } catch (error) {
    next(error);
  }
})

// Add a new snack to Supabase
app.post("/snacks", (request, response, next) => {
  try {
//destructure our request.body object so we can store the fields in variables
    const { name, description, price, category, inStock } = request.body;

    if (!name || !description || !price || !category || inStock == null) {
      return response
      .status(400)
      .json({ message: "Missing required fields!!" });
    }

//create a new object with new id
    const newSnack = { 
      //id: SNACKS.length = 1,
      name, 
      description, 
      price, 
      category, 
      inStock 
    };

//send our object to our SQL db
    const res = supabase.post('/snacks', newSnack);
    if (error) throw error;

    response.status(201).json(newSnack);
  } catch (error) {
    next(error);
  }
});

// Update an existing snack by ID in Supabase
app.put("/snacks/:id", (request, response, next) => {
  try {
    const doundSnack = SNACKS.find((value) => {
      return value.id === parseInt(request.params.id);
    });

//destructure our request.body object so we can store the fields in variables
    const { name, description, price, category, inStock } = request.body;


//error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || inStock == null) {
      return response
      .status(400)
      .json({ message: "Missing required fields!!" });
    }

    //set our found object's value to the ones sent in the request body
    foundSnack.name;
    foundSnack.description = description;
    foundSnack.price = price;
    foundSnack.category = category;
    foundSnack.inStock = inStock;

//send our updated item back in a response
response.json(foundSnack);
console.log(SNACKS);
  } catch (error) {
    next(error);
  }
});

//LEFT FOR LEARNING PURPOSE
// // Fetching  all snacks
// app.get("/snacks", (request, response, next) => {
//   try {
//     response.json(SNACKS); 
//   } catch (error) {
//     next(error);
//   }
// });

// // Fetching snack by ID
// app.get('/snacks/:id', (request, response, next) => {
//   try {
//     const foundSnack = SNACKS.find((value) => {
//       return value.id === parseInt(request.params.id);
//     });

//     if (foundSnack) {
//       response.status(200).json(foundSnack);
//     } else {
//       response.status(404).json({ message: "Snack not found." });
//     }
//     response.json(foundSnack);
//   } catch (error) {
//     next(error);
//   }
// });

// // Adding a new snack
// app.post("/snacks", (request, response, next) => {
//   try {
//     //destructuring request  body object to store the fields in variables
//     const {name, description, price, category, inStock} = request.body;

//     //error handling for all the fields
//   if (!name ||!description ||!price ||!category ||!inStock) {
//     return response
//     .status(400)
//     .json({ message: "Missing required fields!!" });
//   }

//   //Create a new snack
//     const newSnack = { 
//    id: SNACKS.length + 1,
//    name,
//    description,
//    price,
//    category,
//    inStock,
//   };
  
//   //add the new object to data collection (array)
//     SNACKS.push(newSnack);
//     console.log(SNACKS);
//     response.status(201).json(newSnack);
//   } catch (error) {
//     next(error);
//   }
// });

// // Updating an existing snack
// app.put("/snacks/:id", (request, response, next) => {
//   try {
//     const foundSnack = SNACKS.find(value => {
//       return value.id === parseInt(request.params.id);
//     });
// //destructuring...
//     const { name, description, price, category, inStock } = request.body;

// //Error Handling
//     if (!name || !description || !price || !category || inStock == null) {
//       return response
//         .status(400)
//         .json({ message: "Missing required fields!!" });
//     }

// //set found object's values
//     foundSnack.name = name;
//     foundSnack.description = description;
//     foundSnack.price = price;
//     foundSnack.category = category;
//     foundSnack.inStock = inStock;


// //send updated item back in a response
//     response.status(200).json(foundSnack);
//     console.log(SNACKS);
//   } catch (error) {
//     next(error); 
//   }
// });


// // Deleting a snack
// app.delete("/snacks/:id", (request, response, next) => {
//   try {
//     const snackId = parseInt(request.params.id);

//     // Find the snack by ID
//     const foundSnack = SNACKS.find(snack => snack.id === snackId);

//     // Error handling for non-existent snack
//     if (!foundSnack) {
//       return response
//       .status(404)
//       .json({ message: "Snack not found." });
//     }

//     // Get the index of the found snack
//     const snackIndex = SNACKS.indexOf(foundSnack);

//     // Remove snack from array
//     const deletedSnack = SNACKS.splice(snackIndex, 1)[0]; // destructure to get the deleted snack directly

//     // Send response with success message and the deleted snack
//     response.status(200)
//     .json({ message: "Snack deleted successfully.", snack: deletedSnack });
//     console.log(SNACKS);
//   } catch (error) {
//     next(error);
//   }
// });


// Error Handling
// Generic error handling middleware
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json({error: "Something Broke!", 
    errorStack: error.stack,
    errorMessage: error.message,
  })
});

// Handling 404 errors for unmatched routes
app.use((request, response, next) => {
  response.status(404).json({ 
    error:
    "Resource not found. Are you sure you're looking in the right place?",
  });
});

// Make the server listen on our port
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
