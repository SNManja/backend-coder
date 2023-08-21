import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    list: [{
        type: String
    }]
})



export const cartsModel = mongoose.model("carts", cartSchema )