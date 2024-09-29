import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import searchRoute from "./routes/search.js";
dotenv.config();

// app.use(cors()); // Allow all origins

// Alternatively, you can restrict the CORS to specific origins:
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: false,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/search", searchRoute);

app.listen(process.env.PORT, () => {
  console.log(`port running on ${process.env.PORT}`);
});
