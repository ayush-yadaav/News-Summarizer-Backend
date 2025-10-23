import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarizeText(text, url = null) {
  try {
    let content = text;

    if (url) {
      const html = await fetch(url).then(res => res.text());
      content = html.replace(/<[^>]*>?/gm, "").slice(0, 8000);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Give a short summary of this news highlighting only the main points:
      ${content}
    `;
    // const prompt = `
    //   Summarize this news content into 3-5 concise bullet points.
    //   Focus on the main facts only:
    //   ${content}
    // `;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    return summary.trim();
  } catch (err) {
    console.error("❌ Error summarizing:", err.message);
    throw new Error("Failed to summarize news");
  }
}

