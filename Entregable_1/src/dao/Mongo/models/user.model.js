import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        unique:true,
        required:true,
    },
    age: Number,
    password: String, 
    role: String,
})

export const userModel = mongoose.model("users", userSchema)