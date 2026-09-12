const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('savedNews');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio, profileImage, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, profileImage, preferences, updatedAt: Date.now() },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save news
router.post('/save-news/:newsId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const newsId = req.params.newsId;

    if (user.savedNews.includes(newsId)) {
      user.savedNews = user.savedNews.filter(id => id.toString() !== newsId);
    } else {
      user.savedNews.push(newsId);
    }

    await user.save();
    res.json({ saved: user.savedNews.includes(newsId), savedNews: user.savedNews });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
