import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const searchYoutube = async (term) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    term
  )}&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const videoIds = response.data.items
      .map((item) => item.id.videoId)
      .join(",");

    // Get video details (likes, views, etc.)
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const videoDetailsResponse = await axios.get(videoDetailsUrl);

    return videoDetailsResponse.data.items.map((item) => {
      const videoSnippet = response.data.items.find(
        (i) => i.id.videoId === item.id
      ).snippet;

      return {
        type: "YouTube",
        title: videoSnippet.title,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        views: item.statistics.viewCount,
        likes: item.statistics.likeCount,
        thumbnail: videoSnippet.thumbnails.high.url,
        createdAt: videoSnippet.publishedAt,
        relevance: Math.random() * 10,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Export the function
export default searchYoutube;
