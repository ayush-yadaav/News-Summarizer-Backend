// utils/fetchNews.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function fetchTopNews(country = "in", category = "general", max = 10) {
  try {
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&topic=${category}&max=${max}&apikey=${process.env.GNEWS_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;


    if (data.articles && data.articles.length > 0) {
      return data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
        image: article.image,
      }));
    } else {
      console.warn("⚠️ No articles found");
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching news:", error.response?.data || error.message);
    return [];
  }
}
