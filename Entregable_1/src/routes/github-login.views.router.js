import { Router } from "express";

const router = new Router()

router.get("/login", (req, res)=>{
    res.render("github-login")
})

router.get("/error", (req, res) => {
    res.render("error", {
        error: "No se pudo autenticar con github"
    })
})


export default router;