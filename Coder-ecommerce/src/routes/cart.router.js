import { Router } from "express";
import * as CartService from "../controllers/cart.controller.js";

const router = Router()

 
router.post("/",CartService.addNewCart)

router.get("/:cid", CartService.findCartById)

router.post("/:cid/product/:pid/", CartService.addProductToCart)

router.delete("/:cid/products/:pid",CartService.deleteProductFromCart)

router.put("/:cid", CartService.updateProductInCart)

router.put("/:cid/products/:pid", CartService.updateStockInCart)

router.delete("/:cid", CartService.deleteCart )

export default router;