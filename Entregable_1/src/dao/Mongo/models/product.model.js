import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    desc : String,
    price : Number,
    status : Boolean,
    stock : Number,
    code : String,
    category : String,
    thumbnails :[{
        type: String
    }]

})


export const productModel = mongoose.model("products", productSchema)