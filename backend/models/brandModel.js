import mongoose  from 'mongoose'
import slug  from 'mongoose-slug-generator';

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

mongoose.plugin(slug, options);

// Brand Schema
const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  slug: { type: String, slug: 'name', unique: true },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  products:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    default:null
  }],
 
  image:{
    type:String,
  },
 updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

const Brand = mongoose.model('Brand', BrandSchema);

export default Brand;
