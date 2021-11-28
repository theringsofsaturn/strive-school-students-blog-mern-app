import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

// ************ UPDATE ************
// We use the "id" parameter because we want to update a specific user.
userRouter.put("/:id", async (req, res) => {
  // Check if user id sent in the request is = the id of the user that we want to update (the id in URL --> req.params)...
  if (req.body.userId === req.params.id) {
    // another conditional to check if we are sending the password in the request. In that case we should hash the password.
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      // Find the user by id. We indicate the id we have in the URL as a parameter (/:id). After that we can update the user. For that we use the "set" method.
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // We want to update the user with the properties that we have in the request body.
        },
        { new: true } // This is to return the updated user, not the old one. Without this, we will get the old user in the response.
      );
      // Send the user back to the client with a status code.
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// ************ DELETE ************
userRouter.delete("/:id", async (req, res) => {
  // Check if the user id sent in the request is = the id of the user that we want to delete (the id in URL --> req.params)...
  if (req.body.userId === req.params.id) {
    try {
      // Find the user by id. We indicate the id we have in the URL as a parameter (/:id)
      const user = await User.findById(req.params.id);
      try {
        // **N.B.** If we delete this user, we can still see the posts that this user has created.
        // For that, we use Post.deleteMany(), because we can have many posts that belongs to the same user.
        // as an argument we write the condition. In this condition, we check if this username is the same with the user inside our database. In that case, we delete the posts.
        await Post.deleteMany({ username: user.username });
        // Get the id in the params and Delete the user.
        await User.findByIdAndDelete(req.params.id);
        // Send the user back to the client with a status code.
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// ************ GET ************
userRouter.get("/:id", async (req, res) => {
  try {
    // Find the user by id. We indicate the id we have in the URL as a parameter (/:id)
    const user = await User.findById(req.params.id);
    // Send the user but without the password back to the client with a status code.
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRouter;
