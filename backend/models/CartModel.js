

import Mongoose  from 'mongoose'
import slug  from 'mongoose-slug-generator';
const { Schema } = Mongoose;


// Category Schema
const CartSchema = new Schema({
 
 author:{
     type:Schema.Types.ObjectId,
     ref:'User'
 },
  products: [{
    product:{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
   image:{
       type:String,
       required:true
         },
    name:{ 
      type:String,
      required:true
         },
    qty:{
       type:Number,
       required:true
    },
    seller:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    price:{
      type:Number,
      require:true
    }
  }
  ],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

const Cart = Mongoose.model('Cart', CartSchema);

export default Cart;