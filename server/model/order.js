const  mongoose =require('mongoose');
const schema=new mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    orderDate:{
        type:String,
        required:true
    },
    orderStatus:{
        type:String,
        required:true
    },
    totalPrice:{
        type:String,
        required:true
    },
    shippingAdress:{
        type:String,
        required:true
    }
})
const order=mongoose.model('order',schema);
module.exports=order;