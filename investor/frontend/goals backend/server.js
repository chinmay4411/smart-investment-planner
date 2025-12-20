import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import goalRoutes from "./goalRoutes.js";

dotenv.config();
const app = express();
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
app.use(express.json());

connectDB();

// API routes
app.use("/api/goals", goalRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
