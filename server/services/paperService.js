import axios from "axios";

// Function to search for academic papers using CrossRef API
const searchPapers = async (term) => {
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(
    term
  )}&rows=10`;

  try {
    // Fetch academic papers from CrossRef API
    const response = await axios.get(url);

    // Check if items are present in the response
    if (response.data.message.items && response.data.message.items.length > 0) {
      return response.data.message.items.map((item) => ({
        type: "Academic Paper",
        title: item.title ? item.title[0] : "No Title", // Handle missing titles
        url: item.URL ? item.URL : "#", // Use URL or default
        createdAt: item.created ? item.created["date-time"] : "Unknown", // Handle missing date
        authors: item.author
          ? item.author
              .map((author) => `${author.given} ${author.family}`) // Add space between given and family names
              .join(", ")
          : "Unknown", // Handle missing authors
      }));
    } else {
      return []; // Return empty array if no items found
    }
  } catch (error) {
    console.error("Error fetching academic papers:", error.message);
    return []; // Return empty array on error
  }
};

export default searchPapers;
