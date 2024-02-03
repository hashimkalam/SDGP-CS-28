// import packages to the file
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Use the PORT from environment variables or default to 3000
const port = process.env.PORT || 3000;

const app = express();

// middleware for handling parsing request body
app.use(express.json());

// listening to the running port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: "App started"
    });
});
