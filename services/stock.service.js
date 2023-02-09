const mongoose = require("mongoose")
const Stock= require("../models/Stock")
const ObjectId = mongoose.Types.ObjectId;

// get stock service
exports.getStockService = async (filters, queries) => {
    const stock = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const totalStock= await Stock.countDocuments(filters)
    return { stock, totalStock };
}
// stockserviceById

exports.getStockByIdService=async(id)=>{
    const stock=await Stock.aggregate([
        {
            $match:{_id:ObjectId(id)}
        },
    ])
    //const stock=await Stock.findOne({_id:id})
    // .populate("store.id")
    // .populate("suppliedBy.id")
    // .populate('brand.id')
    return stock
}
//create stock service

exports.createStockService=async(data)=>{
    const stock=await Stock.create(data)
    return stock
}

//update Stock

exports.updateStockService = async (stockId, data) => {
    const result = await Stock.updateOne({
        _id: stockId
    }, {
        $set: data
    }, {
        runValidator: true
    })
    return result;
}

//delete Stock

exports.deleteStockService = async (stockId) => {
    const result = await Stock.deleteOne({
        _id: stockId
    },
        {
            runValidator: true
        })
    return result;
}