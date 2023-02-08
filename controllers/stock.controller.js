const { json, query } = require("express")
const { getStockService, createStockService } = require("../services/stock.service")

exports.getStock=async(req,res,next)=>{
    try {

        let filters={...req.query}

        const excludeFields=['sort','page','limit']
        let filtersString=JSON.stringify(filters)
        filtersString.array.forEach(field =>delete[field])

        filters=JSON.parse(filtersString)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte|in|elemMatch|eq)\b/g, (match) => `$${match}`);
        filters = JSON.parse(filtersString)


        //querys

        const queries={}
        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ')
            queries.sortBy=sortBy
            
        }
        if(req.query.fields){
            const fields=req.query.fields.split(',').join(' ')
            queries.fields=fields
            
        }
        if(req.query.page){
            const {page=1,limit=10}=req.query
            const skip=(page-1)*parseInt(limit)
            query.skip=skip
            query.limit=parseInt(limit)
            
        }

        const stock=await getStockService(filters,queries)
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


//update stock

exports.updateStock = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateStockService(id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'successfully updated the product '
      })
  
    } catch (error) {
  
      res.status(400).json({
        status: 'fail',
        message: 'product data update fail',
        error: error.message
  
      })
  
    }
  }
  
  
  //delete stock
  exports.deleteStock = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteStockService(id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'successfully deleted the product '
      })
  
    } catch (error) {
  
      res.status(400).json({
        status: 'fail',
        message: 'product data delete fail',
        error: error.message
  
      })
  
    }
  }
  