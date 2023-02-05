const { createCategoryService, getCategoryService } = require("../services/category.service")

//create category
exports.createCategory=async(req,res,next)=>{
    try {
        const category=await  createCategoryService(req.body)
        const result=await category.save()
        res.status(200).json({
            status:'success',
            message:'category create successfully',
            data:result
        })
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'category create fail',
            error:error.message
        })
    }
}

//get Category

exports.getCategory= async(req,res,next)=>{
    try {
        const category = await getCategoryService(req.body)
        res.status(200).json({
            status:'success',
            message:'categoy data found successsfully',
            data:category

        })
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'categoy data not found',
            error:error.message
        })
        
    }
}