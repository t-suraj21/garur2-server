import express from 'express';
const router = express.Router();

// Get all tests
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Tests route working',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tests',
      error: error.message
    });
  }
});

export default router; 