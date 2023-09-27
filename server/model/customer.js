var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    regionaddress:{
        type:String,
        required:true
    },
    cityaddress:{
        type:String,
        required:true
    },
    postalCode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
var customer=mongoose.model("customer",schema);
module.exports=customer;