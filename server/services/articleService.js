import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;

// Function to search for articles using Google Custom Search API
const searchArticles = async (term) => {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(
    term
  )}`;

  try {
    // Fetch articles from Google Custom Search API
    const response = await axios.get(url);

    // Check if items are present in the response
    if (!response.data.items) {
      return [];
    }

    // Map through the results and return relevant details
    return response.data.items.map((item) => ({
      type: "Article",
      title: item.title,
      url: item.link,
      snippet: item.snippet.split(" ...")[1] || item.snippet,
      source: item.displayLink || "Unknown Source", // Add source domain
      publishedDate:
        item.pagemap?.metatags?.[0]["og:updated_time"] || "Unknown", // Optional: Use meta tags for date
      // Fetch image thumbnails (if available)
      thumbnail:
        item.pagemap?.cse_image?.[0]?.src ||
        item.pagemap?.cse_thumbnail?.[0]?.src ||
        "No Image Available",
      createdAt: item.snippet.split(" ...")[0],
    }));
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    return [];
  }
};

export default searchArticles;
