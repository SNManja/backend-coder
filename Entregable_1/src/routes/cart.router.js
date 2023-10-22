import { Router } from "express";
import * as CartService from "../controller/cart.controller.js";

let CS = CartService // Borrar es para q no se me vaya el import
const router = Router()

 
router.post("/",CS.addNewCart)

router.get("/:cid", CS.findCartById)

router.post("/:cid/product/:pid/", CS.addProductToCart)

// 2nda entrega 
router.delete("/:cid/products/:pid",CS.deleteProductFromCart)

router.put("/:cid", CS.updateProductInCart)

router.put("/:cid/products/:pid", CS.updateStockInCart)

router.delete("/:cid", CS.deleteCart )

export default router;