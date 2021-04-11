import Cart from '../models/CartModel.js'
import Product from '../models/productModel.js'



export const Addtocart= async(req,res)=>{
const qty=req.params.qty
const product=req.params.id

try{


const user=req.user._id 

if(!product){
    res.status(404).json({message:"we could not find product"})
}

const cart=new Cart({
    products:[{
     product:product,
     qty:qty
    }],
    author:user,
})

await cart.save();
res.status(200).json({cart:cart})

}
catch(err){
    res.status(404).json({"message":err})
    console.log(err)
}

}