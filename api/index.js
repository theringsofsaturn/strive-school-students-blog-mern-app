import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";

dotenv.config();

const port = 3001;
const server = express();
server.use(express.json());
server.use(cors())

/* ************ENDPOINTS******************* */

// mongoose getting-started.js
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("😎 DB is running succesfully")
}


console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("🧡 server is running on port: " + port);
});