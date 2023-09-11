import { Router } from "express";
import passport from "passport";


const router = Router()


router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });


router.get("/githubcallback",passport.authenticate("github", {failureRedirect: "/github/error"}), async (req, res)=>{
    const user = req.user;
    req.session.user = {
        name:  `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    //req.session.admin = true
    res.redirect("/users")
})


router.post("/register", passport.authenticate("register"),async(req,res) =>{
    
    res.send({status: "success", message: "User registered successfully"})
})


// Si tengo que hacer el redirect se lo agrego a authenticate como segundo
// param: {failureRedirect: "/failLogin"}
router.post("/login", passport.authenticate("login"),async (req, res) =>{
    if (!req.user) return res.status(400).send({status: "error", error: "Invalid credentials"} )
    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
    } 
    res.send({status: "success", payload: req.user})
   
})

router.delete("/logout", async (req, res) => {
    console.log("loging out")
    req.session.destroy();
    res.send({ status: 200, payload: req.session.user, message: "User log'd out successfully" });
})

export default router;