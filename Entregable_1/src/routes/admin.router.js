import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router()

router.get("/getAllUsers", userController.getAllUsers)

router.put("/updateUser", userController.updateUser)

router.delete("/deleteUnusedUsers", userController.deleteUnusedUsers)

export default router