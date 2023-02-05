const { createBrandService, getBrandService } = require("../services/brandService")


//create brand 
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

// get brand

exports.getBrand=async(req,res,next)=>{
    try {
        const brand =await getBrandService(req.body)
         res.status(200).json({
            status:'success',
            message:'data found successfully',
            data:brand

         })
        
    } catch (error) {
        res.status(400).json({
            status:'fial',
            message:'data not found',
            error:error.message

        })
        
    }
}