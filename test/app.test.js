require("dotenv").config();
const request = require("supertest");
const { app, server } = require("../api/index");

describe("Snack API", () => {
  // Test GET all snacks
  it("should return all snacks", async () => {
    const response = await request(app)
      .get("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Check if the response is an array
  });

  // Test GET a single snack by ID
  it("should return a snack by ID", async () => {
    const snackId = 1; // Make sure this ID exists in your database
    const response = await request(app)
      .get(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", snackId);
  });

  // Test add a new snack
  it("should add a new snack", async () => {
    const newSnack = {
      name: "Sunshine Blend",
      description: "nuts and fruits blend",
      price: 3.5,
      category: "treats",
      inStock: true,
    };
    const response = await request(app)
      .post("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(newSnack);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "Sunshine Blend");
    expect(response.body).toHaveProperty(
      "description",
      "nuts and fruits blend"
    );
    expect(response.body).toHaveProperty("price", 3.5);
  });

  // Test DELETE a snack by ID
  it("should delete a snack by ID", async () => {
    const snackId = 2; // Adjust this ID for testing purposes
    const response = await request(app)
      .delete(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(204); // No content expected for DELETE
  });

  // Test PATCH to update a snack by ID
  it("should update a snack by ID", async () => {
    const snackId = 31; // Use a valid ID
    const updatedSnack = {
      name: "Coconut Water",
      description: "natural coconut water",
      price: 3.5,
      category: "drinks",
      inStock: true,
    };

    // Perform the PATCH request
    await request(app)
      .put(`/snacks/${snackId}`) // Use PATCH method
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(updatedSnack);

    // Fetch the updated snack to verify changes
    const updatedResponse = await request(app)
      .get(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);

    // Check if the response body contains the updated snack details
    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body).toHaveProperty("name", "Coconut Water");
    expect(updatedResponse.body).toHaveProperty(
      "description",
      "natural coconut water"
    );
    expect(updatedResponse.body).toHaveProperty("price", 3.5);
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});
