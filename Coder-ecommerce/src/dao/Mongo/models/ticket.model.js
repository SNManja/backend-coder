import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
    },
    amount: Number,
    purchaser: {
        type: String,
        required:true,
    },

})

export const ticketModel = mongoose.model("tickets", ticketSchema)