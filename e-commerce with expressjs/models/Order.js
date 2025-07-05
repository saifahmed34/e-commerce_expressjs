const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
OrderItem:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"OrderItem"
}],

address:{
  type:String,
  required:true
},

city:{
  type:String,
  required:true
},



phone:{
  type:String,
  required:true
},


status:{
  type:String,
  required:true,
  default:"Pending"
},


totalPrice:{
  type:Number,
},



user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user",
  required:true
  
},




dateOrdered:{
  type:Date,
  default:Date.now
},



});

module.exports = mongoose.model("orders", orderSchema);


