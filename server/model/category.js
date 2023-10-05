var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:true
    },
    categoryPhoto:{
        type:String,
        required:true
    }
});







var category=mongoose.model("category",schema);
module.exports=category;