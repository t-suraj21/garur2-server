import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, phone, location, class: userClass, bio } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (userClass) user.class = userClass;
    if (bio) user.bio = bio;

    await user.save();
    
    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update study progress
router.post('/progress', auth, async (req, res) => {
  try {
    const { chapterId, chapterName, subject, timeSpent } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add to study history
    user.studyHistory.push({
      chapterId,
      chapterName,
      subject,
      completedAt: new Date(),
      timeSpent
    });

    // Update progress
    user.completedChapters += 1;
    user.totalStudyTime += timeSpent;
    user.lastActivity = new Date();

    await user.save();
    
    res.json({ message: 'Progress updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update test results
router.post('/test-results', auth, async (req, res) => {
  try {
    const { testId, testName, subject, score, timeTaken } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add to test history
    user.testHistory.push({
      testId,
      testName,
      subject,
      score,
      completedAt: new Date(),
      timeTaken
    });

    // Update test statistics
    user.completedTests += 1;
    user.averageScore = ((user.averageScore * (user.completedTests - 1)) + score) / user.completedTests;
    user.lastActivity = new Date();

    await user.save();
    
    res.json({ message: 'Test results updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get study history
router.get('/study-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('studyHistory');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.studyHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test history
router.get('/test-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('testHistory');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.testHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 