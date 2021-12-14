// OLD IMPORT SYNTAX const express = require("express")

import express from "express"; // We need to import express to use it's functionalities.
import mongoose from "mongoose"; // We need to import mongoose to connect to the database.
import cors from "cors"; // Cors is a middleware that allows us to connect to a different domain. In this case, we are allowing our frontend to connect to our backend.
import dotenv from "dotenv"; // We need to import dotenv to use the .env file.
import uniqid from "uniqid"; // To generate a unique id, we can use the uniqid package.
import listEndpoints from "express-list-endpoints"; // List all endpoints in the console.
import multer from "multer";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import categoryRouter from "./routes/categories.js";

dotenv.config(); // To make possible to use dotenv, and update the code and refresh after any change.

const port = 3001; // To define the port we want to use.
const server = express(); // We need to create an express server.
server.use(express.json()); // // This has to be specified BEFORE the routes, otherwise the body will be UNDEFINED
server.use(cors()) // To allow the frontend to connect to the backend.

const __dirname = dirname(fileURLToPath(import.meta.url));
server.use("/images", express.static(path.join(__dirname, "/images"))); // To make the images folder accessible and public.

// ***************** MULTER ***********************
// To upload images, we need to use multer.
// First, we need to create a storage object.
const storage = multer.diskStorage({
  // This is the destination of the image. We will save it in the images folder. It accepts three parameters: request, file, callback. 
  // request is the request object, file is the file object, and callback is the function that we will call when we are done. The callback function will have two parameters: error and the file.
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  // This is the filename of the image. It accepts three parameters: request, file, callback.
  filename: (req, file, cb) => {
    // we can create here a filename but we will send this file name to our React app, so req.body.name
    cb(null, req.body.name); // *NOTE* To test it in Postman, we need to write the name of the image in string here instead of req.body.name
  },
});
// **Note** Basically, Multer is gonna take our file, and save it in the images folder. The filename will be the name which we are providing in the request body (req.body.name)

// And to upload we will use the code below:
const upload = multer({ storage: storage }); // As a storage we are using the storage we created above.
// Upload on this endpoint, and upload single file, which name is "file".
server.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//******************* ENDPOINTS ********************
// All of the endpoints will a prefix. for example /api/auth is the prefix for all the endpoints in auth.js
server.use("/api/auth", authRouter)
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)
server.use("/api/categories", categoryRouter)

// Middleware to tell to Express app that we are using this directory as a static folder. This is when we deploy our app.
server.use(express.static(path.join(__dirname, "/client/build")));
// When the application gets any request, it will redirect to this path, which is 'client' folder. It will redirect to 'client' folder, and it will look inside 'build' folder (that we don't have yet, but during deployment, Heroku will create it for us) and in the end will use index.html file to display the content in the broweser.
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});




// *********************** ERROR MIDDLEWARES ***************************
// Always to be defined after all the routes

// mongoose getting-started.js
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://ishmael:dostojevski@cluster0.oqgfe.mongodb.net/myBlog?retryWrites=true&w=majority");
  console.log("😎 DB is running succesfully")
}

console.table(listEndpoints(server)); // To list all endpoints in the console.
// Server to listen on the port specified.
server.listen(process.env.PORT || port, () => {
  console.log("🧡 server is running on port: " + port);
});