const Category=require('../models/category')

//create category

exports.createCategoryService=async(data)=>{
    const result=await Category.create(data)
    return result
}

//get category

exports.getCategoryService=async(data)=>{
    const result= await Category.find({})
    return result
}