
import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Product from '../models/productModel.js'
import Brand from '../models/brandModel.js';



// Bring in Models & Helpers
import Category from '../models/categoryModel.js';

import { protect, admin,seller } from '../middleware/authMiddleware.js'

router.post('/add', protect,seller, (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const products = req.body.products;
  const image=req.body.image
  const array = req.body.array;

  
  // const array=[]
  // products.forEach((p)=>array.push(p.value))

  if (!description || !name) {
    return res
      .status(400)
      .json({ error: 'You must enter description & name.' });
  }

  const category = new Category({
    name,
    description,
    products:array,
    image
  });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Category has been added successfully!`,
      category: data
    });
  });
});


// fetch all categories api

router.get('/list', async(req, res) => {

  try{
  const category= await Category.find({}).select('_id name slug image').populate('products')

    res.status(200).json({
      categories: category}
    );
  }
  catch(err){
    res.status(404).json({
      error:err
    });
  }
});


router.get('/select', async(req, res) => {

  try{
  const category= await Category.find({}).select('_id name slug image')

    res.status(200).json({
      categories: category
    });
  }
  catch(err){
    res.status(404).json({
      error:err
    });
  }
});



router.put('/:id',protect,seller,async(req,res)=>{

try{

  const _id=req.params.id
  const name = req.body.name;
  const description = req.body.description;
  const products = req.body.array;
  const image=req.body.image

  await Category.findOneAndUpdate({_id:_id},{name:name,description:description,products:products,image:image})

  res.status(200).json({
    success: true,
    message: `Category has been added successfully!`,
    
  });
}catch(err){
res.status(400).json({error:err})
}

})


router.get('/:id', async(req, res) => {

  try{
    const id=req.params.id
  const category= await Category.findOne({_id:id}).select('_id name slug image products description').populate('products','_id name slug')

    res.status(200).json({
      category: category
    });
  }
  catch(err){
    res.status(404).json({
      error:err
    });
  }
});





router.delete(
  '/delete/:id',
  protect,
 seller,
  async(req, res) => {
           
           const category=await Category.deleteOne({ _id: req.params.id })
      const product= await Product.deleteOne({category:req.params.id})
           
         await Brand.findOneAndUpdate({'products._id':product._id},
                 {$pull:{products:product._id}})

      res.status(200).json({
        success: true,
        message: `Category has been deleted successfully!`,
        category: category
      });
    });
  


export default router;
