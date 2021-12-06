const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const productsSchema = new Schema({
  name: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required:true
  },
  img: {
    type: String,
    default: "http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg"
  },
  price: {
    type: Number,
    required:true
  },
  qty: {
    type: Number,
    required:true
  },
}, {
    timestamps: true
})

const Products = mongoose.model('Product',productsSchema);

module.exports=Products