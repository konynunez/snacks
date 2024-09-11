// Import Dotenv
require("dotenv").config();

const request = require("supertest");
const app = require("../api/index");

describe("Snack API", () => {
  // Test GET all snacks
  it("should return all snacks", async () => {
    const response = await request(app)
      .get("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test GET a single snack by id
  it("should return a snack by ID", async () => {
    const snackId = 10; // Change this ID based on your testing data
    const response = await request(app)
      .get(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", snackId);
  });

  // Test POST a new Snack
  it("should add a new snack", async () => {
    const newSnack = {
      name: "",
      description: "",
      price: 3.5,
      category: "",
      inStock: true,
    };
    const response = await request(app)
      .post("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(newSnack);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "");
    expect(response.body).toHaveProperty("description", "");
    expect(response.body).toHaveProperty("price", 3.5);
  });

  // Test DELETE a snack by id
  it("should delete a snack by ID", async () => {
    const snackId = 1; // Change this ID for testing purposes
    const response = await request(app)
      .delete(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(204);
  });

  // Test PUT to update a snack by id
  it("should update a snack by ID", async () => {
    const snackId = 1; // Use a valid ID
    const updatedSnack = {
      name: "",
      description: "",
      price: 3.5,
      category: "Sodas",
      inStock: true,
    };
    const response = await request(app)
      .put(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(updatedSnack);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "");
  });
});
