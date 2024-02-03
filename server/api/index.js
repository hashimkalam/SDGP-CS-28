// import packages to the file
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Use the PORT from environment variables or default to 3000
const port = process.env.PORT || 3000;

// create an express application
const app = express();

// middleware for handling parsing request body
app.use(express.json());

// middleware for handling CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// connect to the database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");

    // listening to the running port
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

// Add a default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to EliteBluPrint!");
});

// Add error handling for express app setup
app.on('error', (err) => {
    console.error('Express App Error:', err.message);
});
