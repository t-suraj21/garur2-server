import express from 'express';
import { register, login, getCurrentUser, refreshToken } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get current user
router.get('/me', auth, getCurrentUser);

// Refresh token
router.post('/refresh-token', refreshToken);

export default router;
