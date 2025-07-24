const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Test route to check if the API is working
router.get("/", (req, res) => {
  res.send("User API is working");
});

// Routes for user operations
router.post("/register", userController.registerUser);
router.get("/profile/:lineId", userController.getProfile);

module.exports = router;
