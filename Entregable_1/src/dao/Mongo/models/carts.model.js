import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    list: 
        [{
            prodID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: Number,
            
        }],
    default: []
})



export const cartsModel = mongoose.model("carts", cartSchema )