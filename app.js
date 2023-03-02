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

//stock route
const stockRoute = require('./routes/stock.route')

//store route
const storeRoute = require('./routes/store.route')

//supplire route

const supplierRoute=require('./routes/supplier.route')

//userRoute

const userRoute = require("./routes/user.route")



//post data into database
app.use("/api/v1/Product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/stock', stockRoute);
app.use('/api/v1/store', storeRoute);
app.use('/api/v1/supplier', supplierRoute);
app.use('/api/v1/user', userRoute);

module.exports = app