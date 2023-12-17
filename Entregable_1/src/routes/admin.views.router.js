import { Router } from "express";
import { userService } from "../services/factory.js";
import { authAdmin, authToken } from "../utils.js";

const router = Router()

router.get("/", authToken, authAdmin, async (req, res) => {
    let users = await userService.getAllUsers();
    console.log(users);
    res.render("adminUserList", {users: users})
})

router.get("/editUser/:uid", authToken, authAdmin, async (req, res) => {
    let user = userService.getUserById(req.params.uid);
    res.render("admin.editUser", user)
})

export default router

