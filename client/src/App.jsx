import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (term.trim === "") return;
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:8080/search`, {
        params: { term },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search result :", error);
    }
    setLoading(false);
  };

  const filteredResults = results.filter((result) => {
    if (filter === "all") return true;
    return result.type.toLowerCase() === filter;
  });

  return (
    <div className="m-2 text-center flex flex-col items-center">
      <h1 className="font-bold text-4xl m-2">Search Engine</h1>
      <div className="py-4 w-[390px] max-w-[95vw] flex items-center gap-x-2">
        <input
          className="flex-1 border shadow-sm border-gray-300 rounded-md py-2 px-4"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter search term..."
        />
        <button
          className="px-4 py-2 shadow-sm bg-blue-500 text-white hover:bg-blue-400 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex justify-center gap-x-2 md:gap-x-4 mt-4 transition-colors ">
        <button
          className={`${
            filter === "all" ? "border-2 border-blue-500" : "border"
          }  rounded-md py-1 px-2 shadow-sm hover:shadow-md`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={` ${
            filter === "youtube" ? "border-2 border-blue-500" : "border"
          }  rounded-md py-1 px-2 shadow-sm hover:shadow-md`}
          onClick={() => setFilter("youtube")}
        >
          YouTube
        </button>
        <button
          className={` ${
            filter === "article" ? "border-2 border-blue-500" : "border"
          }  rounded-md py-1 px-2 shadow-sm hover:shadow-md`}
          onClick={() => setFilter("article")}
        >
          Articles
        </button>
        <button
          className={` ${
            filter === "academic paper" ? "border-2 border-blue-500" : "border"
          }  rounded-md py-1 px-2 shadow-sm hover:shadow-md`}
          onClick={() => setFilter("academic paper")}
        >
          Papers
        </button>
        <button
          className={`${
            filter === "blog" ? "border-2 border-blue-500" : "border"
          }  rounded-md py-1 px-2 shadow-sm hover:shadow-md`}
          onClick={() => setFilter("blog")}
        >
          Blogs
        </button>
      </div>
      <div className="my-4">
        {loading ? (
          <p className="p-8">Loading...</p>
        ) : filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <a
              key={index}
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-x-4 border hover:border-blue-500 hover:shadow-md shadow-sm rounded-md px-4 my-4 max-w-[95vw] w-[700px] text-left">
                {result.thumbnail && (
                  <img
                    src={result.thumbnail}
                    className="w-full h-full max-w-[100px] object-cover"
                  />
                )}
                <div className="py-2 group">
                  <p className="text-gray-400 text-sm">Type: {result.type}</p>
                  <h3 className="text-xl font-medium group-hover:underline text-blue-500">
                    {result.title}
                  </h3>
                  <div>{result.snippet && result.snippet}</div>
                  <div className="mt-2">
                    {result.views && (
                      <p>
                        <strong>Views:</strong> {result.views}
                      </p>
                    )}
                    {result.likes && (
                      <p>
                        <strong>Likes:</strong> {result.likes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
