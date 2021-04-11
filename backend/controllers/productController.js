import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Brand from '../models/brandModel.js';
import Category from '../models/categoryModel.js';


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  // const products = await Product.find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))
  

   const products = await Product.find({ ...keyword })
   .populate('category','_id name slug')
   .populate('brand','_id name slug')
   .populate('user','_id name userLocation')
   .sort({ createdAt: -1 })
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})



const getsellerProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
        user:req.user._id
      }
    : {user:req.user._id}

  const count = await Product.countDocuments({ ...keyword })
  // const products = await Product.find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))
  

   const products = await Product.find({ ...keyword })
   .populate('category','_id name slug')
   .populate('brand','_id name slug')
   .populate('user','_id name userLocation')
   .sort({ createdAt: -1 })
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})



const getAdminProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
        
      }
    : { }

  const count = await Product.countDocuments({ ...keyword })
  // const products = await Product.find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))
  

   const products = await Product.find({ ...keyword })
   .populate('category','_id name slug')
   .populate('brand','_id name slug')
   .populate('user','_id name userLocation')
   .sort({ createdAt: -1 })
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})







// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

  var product;
  if(req.user.isAdmin){
     product = await Product.findById(req.params.id)
  }
  if(!req.user.isAdmin){
  product = await Product.findOne({_id:req.params.id,user:req.user._id})
  }

  if (product) {
    await product.remove()
    await Brand.findOneAndUpdate({'products._id':req.params.id},
                                 {$pull:{products:req.params.id}})
    await Category.findOneAndUpdate({'products._id':req.params.id},
                                 {$pull:{products:product._id}})
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {

  const brand=req.body.brand
  const category=req.body.category
  try{
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    brand: brand,
    category: category,
    countInStock: req.body.countInStock,
    numReviews: 0,
    description: req.body.description,
    userLocation:req.body.userLocation
  })

  const createdProduct =await product.save()

  await Brand.findOneAndUpdate({_id:brand},
  {$push:{products:createdProduct._id}})
await Category.findOneAndUpdate({_id:category},
  {$push:{products:createdProduct._id}})
  
  res.status(201).json(createdProduct)
}
catch(error){
  
  res.status(404).json({"message":error})

}
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,price, description, image,  brand, category,countInStock,} = req.body

var product;
if(req.user.isAdmin){
   product = await Product.findById(req.params.id)
}
if(!req.user.isAdmin){
product = await Product.findOne({_id:req.params.id,user:req.user._id})
}

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
   
           var updatedProduct = await product.save()

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

const selectProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}).select('_id name slug')

  res.json(products)
})


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  selectProduct,
  getsellerProducts,
  getAdminProducts
}
