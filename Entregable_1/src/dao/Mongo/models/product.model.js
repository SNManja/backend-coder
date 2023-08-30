import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


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

productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model("products", productSchema)