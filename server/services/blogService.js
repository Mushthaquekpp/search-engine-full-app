import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;
const googleCseId = process.env.GOOGLE_CSE_ID;

// Function to search blogs using Google Custom Search API
const searchBlogs = async (term) => {
  const url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCseId}&q=${encodeURIComponent(
    term
  )}`;

  try {
    const response = await axios.get(url);

    // Check if the API response contains any items
    if (response.data.items && response.data.items.length > 0) {
      return response.data.items.map((item) => ({
        type: "Blog",
        title: item.title,
        url: item.link,
        snippet: item.snippet,
        source: item.displayLink || "Unknown Source",
        createdAt:
          item.pagemap?.metatags?.[0]["og:updated_time"] ||
          item.pagemap?.metatags?.[0]["article:published_time"] ||
          "Unknown",
        thumbnail:
          item.pagemap?.cse_image?.[0]?.src ||
          item.pagemap?.cse_thumbnail?.[0]?.src ||
          "No Image Available", // Fetch image thumbnails
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

export default searchBlogs;
