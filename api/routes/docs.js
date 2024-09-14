const docs = {
  message: "Welcome to the Snacks API!",
  endpoints: {
    getAllSnacks: {
      method: "GET",
      route: "/snacks",
      description: "Fetches all snacks from the database.",
      exampleResponse: {
        snacks: [
          {
            id: 1,
            name: "Chips",
            description: "Crispy potato chips",
            price: 2.5,
            category: "Salty Snacks",
            inStock: true,
          },
          {
            id: 2,
            name: "Chocolate Bar",
            description: "Rich milk chocolate",
            price: 1.8,
            category: "Sweets",
            inStock: true,
          },
        ],
      },
    },
    getSnackById: {
      method: "GET",
      route: "/snacks/:id",
      description: "Fetches a single snack by ID.",
      exampleResponse: {
        id: 10,
        name: "Chips",
        description: "Crispy potato chips",
        price: 2.5,
        category: "Salty Snacks",
        inStock: true,
      },
    },
    addSnack: {
      method: "POST",
      route: "/snacks",
      description: "Adds a new snack to the database.",
      requiredFields: ["name", "description", "price", "category", "inStock"],
      exampleRequestBody: {
        name: "Sunshine Blend",
        description: "Nuts and fruits blend",
        price: 3.5,
        category: "Treats",
        inStock: true,
      },
      exampleResponse: {
        id: 3,
        name: "Sunshine Blend",
        description: "Nuts and fruits blend",
        price: 3.5,
        category: "Treats",
        inStock: true,
      },
    },
    updateSnackById: {
      method: "PUT",
      route: "/snacks/:id",
      description: "Updates an existing snack by ID.",
      requiredFields: ["name", "description", "price", "category", "inStock"],
      exampleRequestBody: {
        name: "Coconut Water",
        description: "Natural coconut water",
        price: 3.5,
        category: "Drinks",
        inStock: true,
      },
      exampleResponse: {
        message: "Snack updated successfully.",
      },
    },
    deleteSnackById: {
      method: "DELETE",
      route: "/snacks/:id",
      description: "Deletes a snack by ID.",
      exampleResponse: {
        message: "Snack deleted successfully.",
      },
    },
  },
};

module.exports = docs;
