import express from 'express'

// Bring in Models & Helpers
import Cart from '../models/CartModel.js'
import Product from '../models/productModel.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/add', protect, async(req, res) => {
  const user = req.user._id;
  const product = req.body.product;
  const qty = req.body.qty;
  const seller=req.body.seller
  console.log(product)
try{
  const newaddproduct=await  Product.findById(product)
  const cart = new Cart({
        author:user,
        products:[{
            product:product,
            qty:qty,
            name:newaddproduct.name,
            image:newaddproduct.image,
            countInStock:newaddproduct.countInStock,
            price:newaddproduct.price,
            seller:seller
        }]
      });
    
      cart.save((err, data) => {
        if (err) {
            console.log(err)
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          success: true,
          cartId: cart._id,
          products:cart.products,
          qty:qty,
          seller:seller

        });
      });  
}catch(err){
    res.status(400).json({"message":err})
    console.log(err)
}
  
});


router.get('/id',protect,async(req,res)=>{
  const user = req.user._id;
  const cart=await Cart.findOne({author:user})
  if(!cart){
    res.status(404).json({message:"we can't find cart"})
  }
  res.status(200).json({
    cartId:cart._id,
    products:cart.products
  })
})

router.delete('/delete/:cartId', protect, (req, res) => {
  Cart.deleteOne({ _id: req.params.cartId }, err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

const decreaseQuantity = (products,qty) => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $set: { qty: qty } }
      }
    };
  });
//console.log(bulkOptions)
  Cart.bulkWrite(bulkOptions);
};

router.put('/add/:cartId', protect,async (req, res) => {
  
  //console.log(qty)
  
  try{
  const qty=req.body.qty
  const product = req.body.product;
  const seller=req.body.seller;
  const query = { _id: req.params.cartId };
const addedproduct=await Product.findById(product)
const productexits=await Cart.findOne({_id: req.params.cartId,'products.product':product,'products.product':product})
//console.log(productexits)

  if(productexits){
    await Cart.updateOne({_id: req.params.cartId,'products.product':product,'products.product':product},
                                        {$set:{'products.$.qty':qty}} )
  }else{
    await Cart.updateOne(query, { $push: { products:{product: product,qty:qty
                                                    ,image:addedproduct.image,countInStock:addedproduct.countInStock,
                                                     name:addedproduct.name,  price:addedproduct.price,seller:seller } } })
  }    
     const cart=await Cart.findOne(query)
      res.status(200).json({
        success: true,
         cartId: cart._id,
        products:cart.products,
        qty:qty
      });
  
}catch(err){
  console.log(err)

}
  
});


router.delete('/delete/:cartId/:productId', protect, (req, res) => {
  const product = { product: req.params.productId };
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $pull: { products: product } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});



export default router;