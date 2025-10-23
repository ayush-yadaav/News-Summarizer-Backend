import express from "express";
import { fetchTopNews } from "../utils/fetchNews.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Fetch top news by category or country
router.get("/top", authenticateToken, async (req, res) => {
  const { country = "in", category = "general" } = req.query;
  try {
    const news = await fetchTopNews(country, category, 10);
    res.json(news);
  } catch (err) {
    console.error("❌ Error fetching news:", err.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

export default router;
