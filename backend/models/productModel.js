import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type : String , requried: true},
    description : {type : String , requried: true},
    price : {type : Number , requried: true},
    image : {type : Array , requried : true},
    category : {type : String , required : true},
    subCategory : {type: String , required :true},
    sizes : {type : Array , required : true},
    bestseller :{type: Boolean},
    date: {type : Number, required : true }
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel
