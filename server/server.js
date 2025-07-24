// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const lineRoutes = require("./routes/lineRoutes");
const userRoutes = require("./routes/userRoutes");
// เพิ่มเติม routes อื่นๆ เช่น groupRoutes, expenseRoutes ตามลำดับ

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ใช้งาน routes
app.use("/api/users", userRoutes);
app.use("/api/line", lineRoutes);
// app.use('/api/groups', groupRoutes);
// app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

console.log("Server started successfully at", new Date().toLocaleString());
console.log("Environment variables loaded: http://localhost:" + PORT);
