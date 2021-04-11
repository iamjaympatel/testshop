//const express = require('express');
import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js';
const router = express.Router();

// Bring in Models & Helpers
import Brand from '../models/brandModel.js';


import { protect, admin,seller } from '../middleware/authMiddleware.js'




router.post(
  '/add',
 protect,
 seller,
  async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
       const products=req.body.products
      const image=req.body.image
      console.log(products)
       
      if (!description || !name) {
        return res
          .status(400)
          .json({ error: 'You must enter description & name.' });
      }

      const brand = new Brand({
        name,
        description,
        products,
        image
      });

      const brandDoc = await brand.save();

      res.status(200).json({
        success: true,
        message: `Brand has been added successfully!`,
        brand: brandDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
 protect,
 seller,
  async (req, res) => {
    try {
     
      const brandId = req.params.id;
      console.log(brandId)
      const name = req.body.name;
  
      const image=req.body.image;
      const description = req.body.description;

      await Brand.findOneAndUpdate({_id:brandId},{name:name,image:image,description:description});

      res.status(200).json({
        success: true,
        message: 'Brand has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: error
      });
    }
  }
);


// fetch store brands api
router.get('/list', async (req, res) => {
  try {
    const brands = await Brand.find({}).select('_id name slug image description products').populate('products')

    res.status(200).json({
      brands
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.get('/select', async(req, res) => {

  try{
  const brand= await Brand.find({}).select('_id name slug products').populate('products','_id name' )

    res.status(200).json({
      brands: brand
    });
  }
  catch(err){
    res.status(404).json({
      error:err
    });
  }
});


//find product using brand
router.get('/:id', async (req, res) => {
  try {
    const brandId = req.params.id;

    const brandDoc = await Brand.findOne({ _id: brandId }).populate('products')

    if (!brandDoc) {
      res.status(404).json({
        message: `Cannot find brand with the id: ${brandId}.`
      });
    }

    res.status(200).json({
      brand: brandDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


//update brand



router.delete(
  '/delete/:id',
 protect,
seller,
  async (req, res) => {
    try {

      const brand = await Brand.deleteOne({ _id: req.params.id });
      const product= await Product.deleteOne({brand:req.params.id})
      await Category.findOneAndUpdate({'products._id':product._id},
{$pull:{products:product._id}})
   
      res.status(200).json({
        success: true,
        message: `Brand has been deleted successfully!`,
        brand,
        product
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

export default router;
