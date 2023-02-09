const express=require("express")
const router=express.Router()
const stockController=require("../controllers/stock.controller")

router
    .route("/")
    .get(stockController.getStock)
    .post(stockController.createStock)

router
    .route("/:id")
    .get(stockController.getStockrById)
    .patch(stockController.updateStock)
    .delete(stockController.deleteStock)
    
    module.exports=router;