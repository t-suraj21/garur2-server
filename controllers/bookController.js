import Book from '../models/Book.js';

export const getChapter = async (req, res) => {
  const { classId, subject, chapterId } = req.params;
  try {
    const book = await Book.findOne({ classId, subject, chapterId });
    if (!book) return res.status(404).json({ message: 'Chapter not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapter' });
  }
};
