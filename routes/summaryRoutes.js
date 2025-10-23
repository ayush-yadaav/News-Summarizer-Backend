import express from "express";
import Summary from "../model/Summary.js";
import { summarizeText } from "../utils/summarize.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔹 Create summary
router.post("/", authenticateToken, async (req, res) => {
  const { text, url, title } = req.body;

  try {
    const summaryText = await summarizeText(text, url);
    const summary = await Summary.create({
      user: req.user,
      title,
      originalText: text,
      summary: summaryText,
      url,
    });
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Failed to summarize news" });
  }
});

// 🔹 Get total and today’s count
router.get("/stats", authenticateToken, async (req, res) => {
  const total = await Summary.countDocuments({ user: req.user });
  const today = await Summary.countDocuments({
    user: req.user,
    createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
  });
  res.json({ total, today });
});

// 🔹 Get saved summaries
router.get("/saved", authenticateToken, async (req, res) => {
  const summaries = await Summary.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(summaries);
});

// 🔹 Delete summary
router.delete("/:id", authenticateToken, async (req, res) => {
  await Summary.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Summary deleted successfully" });
});

export default router;
