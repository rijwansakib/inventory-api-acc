const express = require('express')
const router= express.Router();
const brandController=require('../controllers/brand.controller')
const authorization = require("../middleWare/authorization");
const verifyToken = require("../middleware/verifyToken");

router.route('/')
    .post(verifyToken, authorization("admin", "store-manage"),brandController.createBrand)
    .get(brandController.getBrand)

module.exports=router