import express from 'express';
import { signup } from '../controllers/auth.controller.js';

// Create a new router
const router = express.Router();

// Add a route to handle user signup
router.post("/signup", signup)

export default router;