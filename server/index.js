const express = require('express');
const mongoose =require("mongoose");
require('dotenv').config()

const bodyParser =require("body-parser");
const cors =require("cors");
const userRoutes =require("./routes/userRoutes.js");


const app=express();
const port=process.env.PORT; 
const mongodbUrl = process.env.MONGODB_URL;

app.use(cors(
  {origin:'http://localhost:3000',
    credentials:true
  }
));

app.use(bodyParser.json());
app.use("/api",userRoutes);
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongodbUrl);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
    connectDB().then(() => {
    app.listen(port, () => {
    console.log(`xingShop Backend is listening at http://localhost:${port}`)
  })})

