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

// ************** UPDATE POST ******************
postsRouter.put("/:id", async (req, res) => {
  try {
    // Find the post in we have in the URL params.
    const post = await Post.findById(req.params.id);
    // if username of the post registered in the database is the same as the username of the user that is logged in, it means the user is the owner, then we can update the post.
    if (post.username === req.body.username) {
      try {
          // Update the post with id in the URL with the properties that we have in the request body.
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body, // We want to update the post with the properties that we have in the request body.
          },
          { new: true } // This is to return the updated post, not the old one. Without this, we will get the old post in the response.
        );
        // Send the updated post back to the client with a status code.
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default postsRouter;
