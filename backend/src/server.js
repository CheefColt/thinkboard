import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "../src/middleware/rateLimiter.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json()); // this middleware will parse JSON bodies: req.body

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(rateLimiter);

// Simple custrom Middleware
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} and Request URL is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB(process.env.MONGODB_CONNECT_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
