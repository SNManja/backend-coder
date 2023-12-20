import { Router } from "express";
import { authAdmin, authToken } from "../utils.js";

const router = Router()

router.get("/", authToken, authAdmin, async (req, res) => {
    res.render("adminUserList")
})

export default router

