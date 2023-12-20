import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router()

router.get("/getAllUsers", userController.getAllUsers)

router.put("/updateUser", userController.updateUser)

router.delete("/deleteUser/:uid", userController.deleteUser)

router.post("/upgradeUser/:uid", userController.upgradeUser)

router.delete("/deleteUnusedUsers", userController.deleteUnusedUsers)

export default router