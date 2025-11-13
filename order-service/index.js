const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "order-service",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Mock orders data
const orders = [
  {
    id: 1,
    userId: 1,
    items: ["laptop", "mouse"],
    total: 1299.99,
    status: "completed",
    orderDate: "2024-11-01",
  },
  {
    id: 2,
    userId: 2,
    items: ["phone", "case"],
    total: 899.99,
    status: "pending",
    orderDate: "2024-11-12",
  },
  {
    id: 3,
    userId: 1,
    items: ["keyboard"],
    total: 129.99,
    status: "shipped",
    orderDate: "2024-11-10",
  },
];

// Get all orders endpoint
app.get("/api/orders", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length,
      message: "Orders retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
  console.log(`Orders API available at: http://localhost:${PORT}/api/orders`);
});

module.exports = app;
