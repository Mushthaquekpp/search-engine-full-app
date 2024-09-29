import express from "express";
import rankResults from "../helpers/rank.js";
import searchArticles from "../services/articleService.js";
import searchYoutube from "../services/youtubeService.js";
import searchPapers from "../services/paperService.js";
import searchBlogs from "../services/blogService.js";

const router = express.Router();

// Route to handle search requests
router.get("/", async (req, res) => {
  const { term } = req.query;

  // Return error if search term is not provided
  if (!term) {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    // Perform searches for YouTube videos, articles, and academic papers concurrently
    const [youtubeResults, articleResults, paperResults, blogResults] =
      await Promise.all([
        searchYoutube(term),
        searchArticles(term),
        searchPapers(term),
        searchBlogs(term),
      ]);

    // Combine all results into a single array
    const combinedResults = [
      ...youtubeResults,
      ...articleResults,
      ...paperResults,
      ...blogResults,
    ];

    // Rank combined results using rankHelper
    const rankedResults = rankResults(combinedResults);

    console.log({
      youtubeResults: youtubeResults.length,
      articleResults: articleResults.length,
      paperResults: paperResults.length,
      blogResults: blogResults.length,
    });

    res.json(rankedResults);
  } catch (error) {
    console.error(error);
    // Return error response if something goes wrong
    res
      .status(500)
      .json({ error: "Error occurred while fetching search results" });
  }
});

export default router;
