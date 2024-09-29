# Search Engine Integration

This project is a search engine tool that fetches and ranks content from various sources such as YouTube, blogs, and academic papers. The tool provides relevant articles, videos, and papers based on a user's search term and ranks them by views, likes, or creation date if other metrics are unavailable.

## Tech Stack

**Client:** React.JS with Vite, TailwindCSS

**Server:** Node.JS, Express.JS

## Screenshots

![App Screenshot](https://i.ibb.co/bQxcGR0/Screenshot-2024-09-29-172916.png)

## Approach

**Frontend**

- The React.js application takes a search term input and sends a request to the Express backend to gather content from various sources.
- The UI displays the fetched results, including views, likes, and thumbnails when available.
- Used TailwindCSS for a clean, responsive design with hover effects and adaptive layouts for images.

**Backend**

- YouTube API: Fetches videos related to the search term. If views, likes, or thumbnails are available, they are displayed. Otherwise, the ranking is based on video creation date.
- Google Custom Search API: Retrieves blog articles from multiple sources. Articles with thumbnails and metadata are displayed, sorted by date when likes/views are unavailable.
- CrossRef API: Fetches academic papers. If metadata such as views or popularity is missing, results are sorted by the paper’s publication date.

**Ranking Algorithm**

- Content is ranked primarily by the number of views and likes if available.
- For sources where this information is missing, we fall back on sorting by creation or publication date.
- This ranking logic was implemented to ensure relevance when traditional metrics like views/likes are not present.

## Challenges Faced

**API Integration**

- **Setting up API Keys** - Integrating Google APIs was complex due to the configuration and authorization required for each API. Setting up the Google Custom Search and YouTube API required several iterations to resolve key validation and CORS issues.

- **Inconsistent Data from APIs** - Missing Metrics: Some APIs did not provide views, likes, or relevance metrics, especially in blog and academic paper searches. To solve this, the ranking system was adjusted to fall back on sorting by createdAt or publishedDate.

### Final Output

The final product delivers a rich, integrated search experience combining YouTube videos, blog articles, and academic papers into a unified result set. The content is dynamically ranked, ensuring that the most relevant or recently published items are surfaced to the user.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Mushthaquekpp/search-engine-full-app
```

### Run Client

Go to the project directory

```bash
  cd search-engine-full-app/client
```

Install dependencies

```bash
  npm install
```

Start the client server

```bash
  npm run dev
```

### Run Server

Go to the project directory

```bash
  cd search-engine-full-app/server
```

Install dependencies
(Dont forget to set up the .env file)

```bash
  npm install
```

Start the client server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your search-engine-full-app/server/.env file

`PORT=8080`

`YOUTUBE_API_KEY`

`GOOGLE_API_KEY`

`GOOGLE_CSE_ID`

## API Reference

#### Get serach results

```http
  GET /search?term=${searchTerm}
```

| Parameter    | Type     | Description                |
| :----------- | :------- | :------------------------- |
| `searchTerm` | `string` | **Required**. Search query |
