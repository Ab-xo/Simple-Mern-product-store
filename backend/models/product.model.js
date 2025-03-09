import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image:{
    type:String,
    required: true
  },
},{
    timestamps: true // this will automatically add the createdAt and the updatedAt field

});


const Product = mongoose.model('Product', productSchema);  // this will create a new collection called products

export default Product;// this will export the model so that we can use it in other files