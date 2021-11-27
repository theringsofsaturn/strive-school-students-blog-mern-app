import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

// ************ REGISTER ************
authRouter.post("/register", async (req, res) => {
  try {
    // This is to generate a salt. A salt is a random string that is used to hash a password. It is used to make the password more secure. The higher the number, the more secure the password. The higher the number, the more time it takes to hash the password.
    const salt = await bcrypt.genSalt(10);
    // To hash the password. The first parameter is the password, the second is the salt. The third is the number of rounds.
    const hashedPass = await bcrypt.hash(req.body.password, salt); 
    // Create new user. If we say User(req.body), it will take everything from the request body and put it in the user model. In this case even if we send something unrelated to this user, it still gonna take this property because we are saying everything inside (req.body). To prevent this, we can indicate what we want to take from the request body, our own properties.
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass, // This will be our new password hashed.
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
