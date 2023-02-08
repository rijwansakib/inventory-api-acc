const { getSupplierService, createSupplierService ,getSupplierByIdService,updateSupplierService} = require("../services/supplierSrrvice");

// get supplire data
exports.getSupplier=async(req,res,next)=>{
    try {
        const supplier=await getSupplierService();
        res.status(200).json({
            status:'success',
            message:'supplire data find ',
            data:supplier
        })
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:"supplire data not found",
            error:error.message
        })
    }
}

//create supplire data
exports.createSupplier=async(req,res,next)=>{
    try {
        const supplire=await createSupplierService(req.body);
        res.status(200).json({
            status:'success',
            message:'supplire data create successfullt',
            data:supplire
        })
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:"supplire data create fail",
            error:error.message
        })
    }
}

//get supplire data by ID

exports.getSupplierById=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const supplier=await getSupplierByIdService(id)
        if(!supplier){
            return res.status(400).json({
              status: "fail",
              error: "Couldn't find a supplier with this id"
            })
          }
          
    res.status(200).json({
        status: "success",
        data: supplier,
      });
        
    } catch (error) {
        res.status(400).json({
            satus:'fail',
            message:'supplier data not found ',
            error:error.message
        })
    }

}


//update supplier

exports.updateSupplierId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await updateSupplierService(id, req.body);
  
      console.log(result);
  
      if (!result.nModified) {
        return res.status(400).json({
          status: "fail",
          error: "Couldn't update the supplier with this id",
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Successfully updated the supplier"
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "fail",
        error: "Couldn't update the brand",
      });
    }
  };

