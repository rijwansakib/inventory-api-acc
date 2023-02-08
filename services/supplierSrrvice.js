const Supplier=require('../models/Supplier')

// create supplier
exports.createSupplierService=async(data)=>{
    const result= await Supplier.create(data)
    return result
}

//get supplier

exports.getSupplierService=async()=>{
    const result=await Supplier.find({})
    return result
}

//get supplire By id

exports.getSupplierByIdService=async(id)=>{
    const result= await Supplier.find({_id:id})
    return result
}

//update Supplier

exports.updateSupplireById= async(id,data)=>{

    const result= await Supplier.updateOne({_id:id},data,{
        runValidator:true
    })

    return result
    
}