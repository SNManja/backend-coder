import { Router } from "express";
import { restorePassword, sendEmail } from "../controllers/mailing.controller.js";

const router = Router();

router.get("/:email", sendEmail)

router.put("/:id", restorePassword)


export default router
