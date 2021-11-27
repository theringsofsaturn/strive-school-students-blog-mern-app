import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

// ************ REGISTER ************
authRouter.post("/register", async (req, res) => {
  try {
    // This is to generate a salt. A salt is a random string that is used to hash a password. It is used to make the password more secure. The higher the number, the more secure the password. The higher the number, the more time it takes to hash the password.
    const salt = await bcrypt.genSalt(10);

    // This is to hash the password. The first parameter is the password, the second is the salt. The third is the number of rounds.
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Then, create new user. If we say User(req.body), it will take everything from the request body and put it in the user model. In this case even if we send something unrelated to this user, it still gonna take this property because we are saying everything inside (req.body). To prevent this, we can indicate what we want to take from the request body, our own properties.
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
authRouter.post("/login", async (req, res) => {
  try {
    // Find the user with the username that we sent in the request. FindOne because it's unique user, there is only one user with this username and email. As an argument we specify which user we want to find. Username will be what we get from the request, then we try to find that user inside our MongoDB database.
    const user = await User.findOne({ username: req.body.username });

    // If the user is not found in our database, we send a message.
    !user && res.status(400).json("Wrong credentials!");

    // If the user is found, we should validate the password. For example we compare the password "123" with password saved as hash in our database. If they are the same, the user can log in. We use compare() method from bcrypt for this, which takes as the first parameter the password that the user entered, and the second parameter is the password that we have saved in our database.
    const validated = await bcrypt.compare(req.body.password, user.password);
    
    // If the password is not validated, we send a message.
    !validated && res.status(400).json("Wrong credentials!");

    // If the password is validated, we send the user back to the client.
    // res.status(200).json(user); ==> this will show the password (hashed) in the response.

    // **NB** We don't want to send the password (even though hashed) back to the client.
    const { password, ...others } = user._doc; // We use the spread operator to remove the password from the user. It this case, it will not show up the password in the response, but it will show the other properties ("other" is everything else in the document").
    // ** if we don't add _doc, we will get every kind of property from the user. So, we need user._doc. It will return the user with the properties defined in the schema.
    res.status(200).json(others); // send back other properties without the password.
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default authRouter;
