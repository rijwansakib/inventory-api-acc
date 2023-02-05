const Stock= require("../models/Stock")

// get stock service
exports.getStockService=async()=>{
    const result=await Stock.find({})
    return result
}

//create stock service

exports.createStockService=async(data)=>{
    const result= await Stock.create(data)
    return result
}