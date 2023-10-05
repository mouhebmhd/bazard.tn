var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    clientID:{
        type:String,
        required:true
    },
    productID:{
        type:String,
        required:true
    },
    productCount:
    {
        type:String,
        required:true
    },
    subTotalPrice:{
        type:String,
        required:true
    }
});







var panier=mongoose.model("panier",schema);
module.exports=panier;