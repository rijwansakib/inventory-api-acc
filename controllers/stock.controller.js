const { json, query } = require("express")
const { getStockService, createStockService ,getStockByIdService, updateStockService, deleteStockService} = require("../services/stock.service")

exports.getStock=async(req,res,next)=>{
    
  try {

    let filters = { ...req.query };
    const excludeFields = ['sort', 'page', 'limit']
    excludeFields.forEach(field => delete filters[field])

    let filtersSrting = JSON.stringify(filters)
    filtersSrting = filtersSrting.replace(/\b(gt|gte|lt|lte|in|elemMatch|eq)\b/g, (match) => `$${match}`);
    filters = JSON.parse(filtersSrting)



    //sort
    const queries = {}
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      queries.sortBy = sortBy
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      queries.fields = fields
    }

    //pagination
    if(req.query.page){
      const {page=1,limit=10}=req.query;
      const skip=(page-1)*parseInt(limit)
      queries.skip=skip;
      queries.limit=parseInt(limit)
    }


    const stock = await getStockService(filters, queries)
    res.status(200).json({
      status: 'success',
      data: stock
    })

  } catch (error) {
    res.status(400).json({
      Status: 'fail',
      message: 'data not found',
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
//getStockById
exports.getStockrById=async(req,res,next)=>{
  
  try {
    const {id}=req.params;
      const stock=await getStockByIdService(id)
      if(!stock){
          return res.status(400).json({
            status: "fail",
            error: "Couldn't find a stock with this id"
          })
        }
        
  res.status(200).json({
      status: "success",
      data: stock,
    });
      
  } catch (error) {
      res.status(400).json({
          satus:'fail',
          message:'stock data not found',
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
        message: 'successfully updated the product',
        data:result
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
        message: 'successfully deleted the stock',
        data:result
      })
  
    } catch (error) {
  
      res.status(400).json({
        status: 'fail',
        message: 'stock data delete fail',
        error: error.message
  
      })
  
    }
  }
  