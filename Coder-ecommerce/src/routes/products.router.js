import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { uploader } from "../utils.js";

const router = Router()
let PC = productController;


// main /api/products page
router.get("/", PC.getProducts)

// Filter by id /api/products/:pid
router.get("/:pid", PC.getProductsById)

router.post("/", uploader.array("thumbnails"), PC.addProduct)

router.put("/:pid", PC.updateProductById)

router.delete("/:pid", PC.deleteProductById)


export default router;