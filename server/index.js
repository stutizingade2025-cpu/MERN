const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();

const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
const port = process.env.PORT || 8000; 
const mongodbUrl = process.env.MONGODB_URL;

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://mern-stack-c8ob.onrender.com'
  ],
  credentials: true
}));

app.use(bodyParser.json());
app.use("/api", userRoutes);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`xingShop Backend is listening at http://localhost:${port}`);
  })
}).catch((error) => {
  console.error("Failed to start server:", error);
});