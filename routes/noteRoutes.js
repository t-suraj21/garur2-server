import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and require authentication
router.use(auth);

// Get all notes
router.get('/', getNotes);

// Create a new note
router.post('/', createNote);

// Update a note
router.put('/:id', updateNote);

// Delete a note
router.delete('/:id', deleteNote);

export default router; 