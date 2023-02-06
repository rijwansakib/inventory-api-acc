const { Query } = require('mongoose');
const Product = require('../models/Product')
const Brand = require('../models/Brand')




//get product

exports.getProductService = async (filters, queries) => {
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const totalProduct = await Product.countDocuments(filters)
    return { products, totalProduct };
}



//create product
exports.createProductService = async (data) => {
    const product = await Product.create(data)
    // product id
    //brand
    //update brand
    const { _id: productId, brand } = product;
    await Brand.updateOne(
        { _id: brand.id },
        { $push: { products: productId } }
    )

    return product;
}

exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({
        _id: productId
    }, {
        $set: data
    }, {
        runValidator: true
    })
    return result;
}
exports.deleteProductService = async (productId) => {
    const result = await Product.deleteOne({
        _id: productId
    },
        {
            runValidator: true
        })
    return result;
}
