import express from 'express';
import { getChapter } from '../controllers/bookController.js';

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Books route working',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message
    });
  }
});

// routes/books.js
router.get('/:classId/:subject/:chapterId', getBookByClassSubjectChapter);


export default router;
