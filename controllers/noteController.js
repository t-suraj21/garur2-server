import Note from '../models/Note.js';

// Get all notes for a user
export const getNotes = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Error in getNotes:', error);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = new Note({
      title,
      content,
      user: req.user._id
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error in createNote:', error);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Error in updateNote:', error);
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error in deleteNote:', error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
}; 