const request = require("supertest");
const express = require("express");

// Dummy API sederhana
const app = express();
app.use(express.json());

// Dummy data
let items = [{ id: 1, name: "Item 1" }];

// Routes
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

app.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  items = items.filter((item) => item.id !== itemId);
  res.status(204).send();
});

// Integration tests
describe("Integration Tests for /items API", () => {
  // Test GET /items
  it("should return all items", async () => {
    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Item 1" }]);
  });

  // Test POST /items
  it("should create a new item", async () => {
    const response = await request(app).post("/items").send({ name: "Item 2" });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, name: "Item 2" });
  });

  // Test DELETE /items/:id
  it("should delete an item by ID", async () => {
    const response = await request(app).delete("/items/1");
    expect(response.status).toBe(204);

    const getResponse = await request(app).get("/items");
    expect(getResponse.body).toEqual([{ id: 2, name: "Item 2" }]);
  });
});
