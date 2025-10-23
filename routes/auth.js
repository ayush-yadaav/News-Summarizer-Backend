import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { authenticateToken, logoutToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already registered" });

  const user = await User.create({ name, email, password });
  res.json({ message: "Registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// Get profile
router.get("/profile", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

// Update profile
router.put("/profile", authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  await user.save();

  res.json({ message: "Profile updated", user });
});

// Logout
// router.post("/logout", authenticateToken, (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//   logoutToken(token);
//   res.json({ message: "Logged out successfully" });
// });

// Logout (stateless JWT - backend does not need to do anything)
router.post("/logout", authenticateToken, (req, res) => {
  // No need to invalidate JWT on backend
  res.json({ message: "Logged out successfully" });
});

export default router;
