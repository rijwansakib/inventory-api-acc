const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());

// route
const productRoute = require("./routes/Product.route")
const brandRoute = require("./routes/brand.route")


//post data into database

app.use("/api/v1/Product", productRoute);
app.use("/api/v1/brand", brandRoute);


module.exports = app;