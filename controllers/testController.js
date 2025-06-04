import Test from '../models/Test.js';

export const getTest = async (req, res) => {
  const { classId, subject, chapterId } = req.params;
  try {
    const test = await Test.findOne({ classId, subject, chapterId });
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json({ questions: test.questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test' });
  }
};
