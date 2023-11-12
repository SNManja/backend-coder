import mongoose from "mongoose";

const restoreSchema = new mongoose.Schema({
    email: String,
    expiration: Date,
});


restoreSchema.set('expiration', new Date(Date.now() + 3600000))

  
export const restoreModel = mongoose.model("restore", restoreSchema)