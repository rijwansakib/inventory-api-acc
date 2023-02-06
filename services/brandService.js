const Brand = require('../models/Brand')

//create services
exports.createBrandService = async (data) => {
    const result = await Brand.create(data)
    return result;
}

//get services

exports.getBrandService= async(data)=>{
    const result = await Brand.find({}).populate('products')
    return result
}