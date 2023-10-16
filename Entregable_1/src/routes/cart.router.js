import { Router } from "express";
import * as CartController from "../controller/cart.controller.js";

let CC = CartController // Borrar es para q no se me vaya el import
const router = Router()

 
router.post("/",CC.addNewCart)

router.get("/:cid", CC.findCartById)

router.post("/:cid/product/:pid/", CC.addProductToCart)


// 2nda entrega 
router.delete("/:cid/products/:pid",CC.deleteProductFromCart)

router.put("/:cid", CC.updateProductInCart)

router.put("/:cid/products/:pid", CC.updateStockInCart)

router.delete("/:cid", CC.deleteCart )

export default router;