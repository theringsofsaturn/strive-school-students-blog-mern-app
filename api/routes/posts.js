import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

const postsRouter = express.Router();

// ************* CREATE POST ********************
postsRouter.post("/", async (req, res) => {
  // Create a new post with the properties that we have in the request body.
  const newPost = new Post(req.body);
  try {
    // Save the post in the database.
    const savedPost = await newPost.save();
    // Send the post back to the client with a status code.
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default postsRouter;
