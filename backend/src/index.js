import connectDB from "./db/db.js";
import app from "./app.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running on port: ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("Error starting server:", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
