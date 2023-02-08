const Stock= require("../models/Stock")

// get stock service
exports.getStockService=async(filters,queries)=>{
    const stocks=await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)
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