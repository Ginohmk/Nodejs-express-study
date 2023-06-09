const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const postRouter = express.Router();

// POST /posts
postRouter.post('/', async (req, res) => {
  try {
    author = await User.findById(req.body.author);

    const savePost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });

    console.log('Here author', author);

    if (!author) {
      return res.json('Error');
    }

    // Add id of post to author
    author.posts.push(savePost);

    // Save updated author
    await author.save();

    // Response
    res.json(savePost);
  } catch (err) {
    res.json('Error Here');
  }
});

// GET /posts
postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: 'author',
      populate: { path: 'posts', model: 'Post' },
    });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = postRouter;
