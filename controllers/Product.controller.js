//create Product
const { getProductService, createProductService, updateProductService, deleteProductService } = require("../services/Product.services")

exports.createProduct = async (req, res, next) => {

  try {

    const product = await createProductService(req.body)
    console.log(product);
    const result = await product.save()
    res.status(200).json({
      status: 'success',
      message: 'data insert successfully!',
      data: result
    })

  } catch (error) {
    res.status(400).json({
      Status: 'fail',
      message: 'data not insert',
      error: error.message
    })
  }



}

//get product
exports.getProducts = async (req, res, next) => {

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


    const products = await getProductService(filters, queries)
    res.status(200).json({
      status: 'success',
      data: products

    })

  } catch (error) {
    res.status(400).json({
      Status: 'fail',
      message: 'data not found',
      error: error.message
    })
  }

}

//update product

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);
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


//delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id, req.body);
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
