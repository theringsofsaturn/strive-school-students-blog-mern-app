import express from "express";
import Category from "../models/Category.js";

const categoriesRouter = express.Router();

// ************* CREATE CATEGORY ********************
categoriesRouter.post("/", async (req, res) => {
  // Create a new category with the properties that we have in the request body.
  const newCat = new Category(req.body);
  try {
    // Save the category in the database.
    const savedCat = await newCat.save();
    // Send the category back to the client with a status code.
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ************** GET CATEGORY ********************
categoriesRouter.get("/", async (req, res) => {
  try {
      // Find all categories in the database.
    const cats = await Category.find(); // No conditions. Find all.
    // Send all categories back to the client with a status code.
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default categoriesRouter;
