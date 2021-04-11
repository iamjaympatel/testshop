import mongoose  from 'mongoose'
import slug  from 'mongoose-slug-generator';

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

mongoose.plugin(slug, options);

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  slug: { type: String, slug: 'name', unique: true },

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Brand'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Category'
    },
    userLocation:{
      type:String,
      required:true,
      default:'india'
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
