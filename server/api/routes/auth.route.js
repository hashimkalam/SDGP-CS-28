import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

// Create a new router
const router = express.Router();

// Add a route to handle user signup
router.post("/signup", signup)

// add a route to handle user login
router.post("/signin", signin)

export default router;