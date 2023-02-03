const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());

// route
const productRoute = require("./routes/Product.route")


//post data into database

app.use("/api/v1/Product", productRoute);


module.exports = app;