const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
//middleware
app.use(express.json());
app.use(cors());

// product route
const productRoute = require("./routes/Product.route")

//brand route
const brandRoute = require("./routes/brand.route")

//category route
const categoryRoute = require('./routes/category.route')



//post data into database
app.use("/api/v1/Product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use('/api/v1/category', categoryRoute);

module.exports =app