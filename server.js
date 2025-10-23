import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/newsRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/summary", summaryRoutes);

app.get("/", (req, res) => res.send("📰 News Summarizer API is running"));

// app.listen(process.env.PORT, () =>
//   console.log(`🚀 Server running on port ${process.env.PORT}`)
// );

export default app;
