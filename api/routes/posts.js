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

// ************ DELETE POST **********************
postsRouter.delete("/:id", async (req, res) => {
  try {
    // Find the post in we have in the URL params.
    const post = await Post.findById(req.params.id);
    // if username of the post registered in the database is the same as the username of the user that is logged in, it means the user is the owner, then we can delete the post.
    if (post.username === req.body.username) {
      try {
        // Delete the post with id in the URL.
        await post.delete();
        // Send a status code and a message.
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
postsRouter.get("/:id", async (req, res) => {
  try {
    // Find the post in we have in the URL params.
    const post = await Post.findById(req.params.id);
    // Send the post back to the client with a status code.
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ************* GET ALL POSTS ********************
postsRouter.get("/", async (req, res) => {
  // To catch the queries in the URL, we use req.query. It's gonna look at the question mark /?/ and look for the key value pairs. The first value after ? is the query and after = is the value. Example: ?user=johndoe
  const username = req.query.user; // This is for user
  const catName = req.query.cat; // The same thing will be for category
  try {
    // If the user is logged in, we want to get the posts of the user that is logged in. If the user is not logged in, we want to get all the posts of that category.
    // Create a posts array, because we will return this array as a response.
    let posts;
    // if there is a username
    if (username) {
      // If username in our database equals the username above (username in the URL as a query), meaning Post.find({ username:username })
      posts = await Post.find({ username }); // After ES6, we can use this short syntax instead of Post.find({ username: username }). It's the same.
    } // if there is a category name
    else if (catName) {
      // check if the category name is in the categories array of the post (we have an array of categories in the post in the database) To do this we use the $in operator.
      posts = await Post.find({
        categories: {
          $in: [catName], // This basically means: Look at this category array, and if inside includes this category name (catName), just find this and assign to this posts variable (that is an array of posts).
        },
      });
    } else {  // If there is no category name, it will fetch all the posts.
      posts = await Post.find(); // There is no condition, so it will fetch all the posts.
    }
    // Send the posts back to the client with a status code.
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default postsRouter;
