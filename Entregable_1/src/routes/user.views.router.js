import { Router } from "express";
import { restoreTokenChecker } from "../controllers/mailing.controller.js";
import { authToken } from "../utils.js";

const router = Router()

router.get("/login", (req, res) =>{
    res.render("login")
})

router.get("/restorePassword", (req,res) => {
    res.render("restorePassword")
})

router.get("/restorePassword/:id", restoreTokenChecker,(req,res) => {
    res.render("writePassword")
})

router.get("/register", (req, res) =>{
    res.render("register")
})

router.get("/", authToken ,(req, res) =>{
    
    res.render("profile", {
        user:req.user
    })
})


export default router;