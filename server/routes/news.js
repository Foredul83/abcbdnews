const express = require('express');
const News = require('../models/News');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all news
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const news = await News.find(query)
      .populate('author', 'name profileImage')
      .populate('category', 'name color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await News.countDocuments(query);

    res.json({
      news,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured news
router.get('/featured', async (req, res) => {
  try {
    const news = await News.find({ isFeatured: true, isPublished: true })
      .populate('author', 'name profileImage')
      .populate('category', 'name color')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single news
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name profileImage email')
     .populate('category', 'name color')
     .populate('comments.user', 'name profileImage');

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create news (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, description, content, category, tags, image } = req.body;

    if (!title || !description || !content || !category || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const newNews = new News({
      title,
      slug,
      description,
      content,
      category,
      tags,
      image,
      author: req.user.id
    });

    await newNews.save();
    await newNews.populate('author', 'name profileImage');
    await newNews.populate('category', 'name color');

    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like news
router.post('/:id/like', auth, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const hasLiked = news.likes.includes(req.user.id);
    if (hasLiked) {
      news.likes = news.likes.filter(id => id.toString() !== req.user.id);
    } else {
      news.likes.push(req.user.id);
    }

    await news.save();
    res.json({ likes: news.likes.length, liked: !hasLiked });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add comment
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    news.comments.push({
      user: req.user.id,
      text
    });

    await news.save();
    await news.populate('comments.user', 'name profileImage');

    res.json(news.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
