import { Router } from "express";
import { userModel } from "../dao/Mongo/models/user.model.js";

const router = Router()

router.post("/register", async(req,res) =>{
    
    const exists = await userModel.findOne({ email: req.body.email})
    if( exists ){
        return res.status(400).send({ status: "error", message: "User already exists"})
    }
    console.log("passd thru", req.body)
    
    const { first_name, last_name, email, age, password } = req.body
    
    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: password,
        role: "user",
    }

    const result = await userModel.create(user)
    res.send({status: "success", message: "User created successfully" + result.id})

    console.log(req.body)

})

router.post("/login", async (req, res) =>{
    const { email, password } = req.body;
    console.log(email, password)
    const user= await userModel.findOne({ email, password })
    
    if (!user){
        
        res.status(401).send({ status: "error", error: "Incorrect credentials"})
        return 
    }

    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
    }
    

    res.send({ status: 200, payload: req.session.user, message: "User log'd in successfully" });
})

router.delete("/logout", async (req, res) => {
    console.log("loging out")
    req.session.destroy();
    res.send({ status: 200, payload: req.session.user, message: "User log'd out successfully" });
})

export default router;