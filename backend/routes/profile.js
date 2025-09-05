const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Middleware to check login
function isAuth(req, res, next) {
  if (req.session.userId) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

// Get profile
router.get("/", isAuth, async (req, res) => {
  const user = await User.findById(req.session.userId).select("-password");
  res.json(user);
});

// Update profile
router.post("/update", isAuth, async (req, res) => {
  const { name, age, course } = req.body;
  await User.findByIdAndUpdate(req.session.userId, { name, age, course });
  res.json({ success: true });
});

module.exports = router;
