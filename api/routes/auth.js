import express from "express";
import User from "../models/User.js";

const authRouter = express.Router();

// ************ REGISTER ************
authRouter.post("/register", async (req, res) => {
  try {
      // Create new user. If we say User(req.body), it will take everything from the request body and put it in the user model. In this case even if we send something unrelated to this user, it still gonna take this property because we are saying everything inside (req.body). To prevent this, we can indicate what we want to take from the request body, our own properties.
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // Save the new user. Method save() is a mongoose method. We can use it because we are using our User Schema.
    const user = await newUser.save();
    // Send the user back to the client with a status code. 
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ************ LOGIN ***************

export default authRouter;