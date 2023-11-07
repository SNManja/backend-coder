import { Router } from "express";
import passport from "passport";
import { generateJWToken } from "../utils.js";

const router = Router()


router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });


router.get("/githubcallback",passport.authenticate("github", {failureRedirect: "/github/error"}), async (req, res)=>{
    const user = req.user;
    /*

    Para sesiones en mongo
    req.session.user = {
        name:  `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    */
    //req.session.admin = true
    
    
    res.redirect("/users")
})


router.post("/register", passport.authenticate("register"),async(req,res) =>{
    
    res.send({status: "success", message: "User registered successfully"})
})


// Si tengo que hacer el redirect se lo agrego a authenticate como segundo
// param: {failureRedirect: "/failLogin"}
router.post("/login", passport.authenticate("login"),async (req, res) =>{
    let user = req.user
    if(!user) return res.status(400).json({ status: 'error', msg: 'Invalid credentials'})

    const access_token = await generateJWToken(user);
    console.log(access_token)
    // res.send({ jwt: access_token})

    res.cookie("jwtCookieToken", access_token,{
        maxAge: 3600 * 24 * 60 * 60,
        //httpOnly: true,
    })
    res.send({ message: "Login successful"})
})

router.delete("/logout", async (req, res) => {
    console.log("logging out")
    res.clearCookie("jwtCookieToken");
    res.send({ status: 200,  message: "User log'd out successfully" });
})


// No pude hacer que es passport funcionase
router.post("/restorePassword", /*passport.authenticate("restorePassword"), */ async (req,res) => {

    try{
        req.logger.debug("Email recieved")
        req.logger.debug(req.body.email)
        req.logger.warn("sending mail")
        res.send({ status: 200, message: "mail sent successfully" });
    } catch (e){
        res.send({ status: 500, message: "error sending mail" });
    }
    
})

export default router;