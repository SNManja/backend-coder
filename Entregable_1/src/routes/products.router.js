import { Router } from "express";
import * as productService from "../controller/product.controller.js";
import { uploader } from "../utils.js";
import { socketServer } from "./main.router.js";

const router = Router()
let PC = productService;

async function socketEmitter(){
    socketServer.emit("reloadProd", await PC.getProducts());
}
// main /api/products page
router.get("/", PC.getProducts)

// Filter by id /api/products/:pid
router.get("/:pid", PC.getProductsById)

router.post("/", uploader.array("thumbnails"), PC.addProduct)

router.put("/:pid", PC.getProductById)

router.delete("/:pid", PC.deleteProductById)


export default router;