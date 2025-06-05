import express from 'express';
import Note from '../models/Note.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all notes for the authenticated user
router.get('/', auth, async (req, res) => {
  console.log('GET /api/notes - Fetching notes for user:', req.user.id);
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    console.log('Found notes:', notes.length);
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new note
router.post('/', auth, async (req, res) => {
  console.log('POST /api/notes - Creating note for user:', req.user.id);
  try {
    const { title, content } = req.body;
    console.log('Note data:', { title, content });

    const newNote = new Note({
      user: req.user.id,
      title,
      content
    });

    const savedNote = await newNote.save();
    console.log('Note saved successfully:', savedNote._id);
    res.json(savedNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a note
router.put('/:id', auth, async (req, res) => {
  console.log('PUT /api/notes/:id - Updating note:', req.params.id);
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
      console.log('Note not found:', req.params.id);
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      console.log('Unauthorized access attempt for note:', req.params.id);
      return res.status(401).json({ message: 'Not authorized' });
    }

    note.title = title;
    note.content = content;
    note.updatedAt = Date.now();

    const updatedNote = await note.save();
    console.log('Note updated successfully:', updatedNote._id);
    res.json(updatedNote);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a note
router.delete('/:id', auth, async (req, res) => {
  console.log('DELETE /api/notes/:id - Deleting note:', req.params.id);
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      console.log('Note not found:', req.params.id);
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      console.log('Unauthorized delete attempt for note:', req.params.id);
      return res.status(401).json({ message: 'Not authorized' });
    }

    await note.deleteOne();
    console.log('Note deleted successfully:', req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 