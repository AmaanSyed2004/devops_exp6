const request = require("supertest");
const app = require("../index");

describe("User Service", () => {
  test("Health check endpoint should return healthy status", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body.status).toBe("healthy");
    expect(response.body.service).toBe("user-service");
    expect(response.body.version).toBe("1.0.0");
  });

  test("GET /api/users should return all users", async () => {
    const response = await request(app).get("/api/users").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(3);
    expect(response.body.count).toBe(3);
    expect(response.body.message).toBe("Users retrieved successfully");
  });

  test("Non-existent route should return 404", async () => {
    const response = await request(app).get("/api/nonexistent").expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Route not found");
  });
});
