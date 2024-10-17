const express = require('express');
const Post = require('../models/post');
const authMiddleware = require('../middleware/auth');



const router = express.Router();

// Create Post
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.user.id });
    await post.save();
    res.status(201).json(post);
});


// Get All Posts
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
});

// Delete Post
router.delete('/:id', authMiddleware, async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Update Post
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update post' });
    }
});

module.exports = router;
