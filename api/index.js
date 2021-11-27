// OLD IMPORT SYNTAX const express = require("express")

import express from "express"; // We need to import express to use it's functionalities.
import mongoose from "mongoose"; // We need to import mongoose to connect to the database.
import cors from "cors"; // Cors is a middleware that allows us to connect to a different domain. In this case, we are allowing our frontend to connect to our backend.
import dotenv from "dotenv"; // We need to import dotenv to use the .env file.
import uniqid from "uniqid"; // To generate a unique id, we can use the uniqid package.
import listEndpoints from "express-list-endpoints"; // List all endpoints in the console.
import authRouter from "./routes/auth.js";

dotenv.config(); // To make possible to use dotenv, and update the code and refresh after any change.

const port = 3001; // To define the port we want to use.
const server = express(); // We need to create an express server.
server.use(express.json()); // // This has to be specified BEFORE the routes, otherwise the body will be UNDEFINED
server.use(cors())

/* ************ENDPOINTS******************* */
// All of the endpoints will a prefix. for example /api/auth is the prefix for all the endpoints in auth.js
server.use("/api/auth", authRouter)
// *********************** ERROR MIDDLEWARES ***************************
// Always to be defined after all the routes

// mongoose getting-started.js
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("😎 DB is running succesfully")
}


console.table(listEndpoints(server)); // To list all endpoints in the console.
// Server to listen on the port specified.
server.listen(port, () => {
  console.log("🧡 server is running on port: " + port);
});