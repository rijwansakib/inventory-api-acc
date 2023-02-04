const { createBrandService } = require("../services/brandService")

exports.createBrand=async(req,res,next)=>{
    try {
        const brand=await createBrandService(req.body)
        const result= await brand.save()
        res.status(200).json({
            status:'success',
            message:'data create successfully',
            data:result
        })
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'data create fail',
            error:error.message
        })
        
    }
}