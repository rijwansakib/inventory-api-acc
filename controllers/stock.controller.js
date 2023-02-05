const { getStockService, createStockService } = require("../services/stock.service")

exports.getStock=async(req,res,next)=>{
    try {
        const stock=await getStockService()
        res.status(200).json({
            status:'success',
            message:'found stock data',
            data:stock
        })

        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'stock data not found',
            error: error.message
        })
        
    }
}

exports.createStock=async(req,res,next)=>{
    try {
        const result= await createStockService(req.body)
        res.status(200).json({
            status:'success',
            message:'create stock data successfully',
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'create stock data fail',
            error:error.message
        })
    }
}