import { Router } from "express";
import { manager, socketServer } from "../src/app.js";
import { Product } from "../src/productManager.js";
import { uploader } from "../src/utils.js";





const router = Router()


// main /api/products page
router.get("/", async function (req, res) {
    try {
        let prodList = await manager.getProducts()
        let num = parseInt(req.query.limit)
    
        while (prodList.length != num && prodList.length && num) {
            prodList.pop()
        }
        
        res.send(prodList)
        
    } catch (err){
        console.error(err)
        res.status(500).json({error: "Products not found"})
    } 
})

// Filter by id /api/products/:pid
router.get("/:pid", async (req, res)=> {
    // Actualizo el this.products
    await manager.getProducts()
    // NOTA: getProductById por default lo arme para que funcione sincronicamente con memoria
    let prod = manager.getProductById(parseInt(req.params.pid))

    res.send(prod)
})



router.post("/", uploader.array("thumbnails"), async(req,res)=>{
    let prodJSON = req.body 
    let prod
    
    try {
        if (!req.files ) { throw new Error("No thumbnails")}
        prod = new Product(prodJSON.title, prodJSON.desc, prodJSON.code, prodJSON.price, prodJSON.stock, prodJSON.category, req.files)
        await manager.addProduct(prod)
        console.log("product: ",prod)
        socketServer.emit("reloadProd", await manager.getProducts());
        res.status(200).send("Product created successfully")
    } catch (err){
        console.log("err: ",err.message)
        res.status(400).send("Not able to create product")
        
    }
    
    
})

router.put("/:pid", async (req, res) => {
    try {
        let campo = req.body
        
        if ( !campo ){
            throw new Error('Nothing to update');
        }
        await manager.updateProduct(parseInt(req.params.pid), campo  )
        socketServer.emit("reloadProd", await manager.getProducts());

        res.status(200).send("Product updated successfully"+ String( await manager.getProductById(req.params.pid) ) )
    } catch (err){
        res.status(400).send("Error updating product: ", err)
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        await manager.deleteProduct(parseInt(req.params.pid))
        socketServer.emit("reloadProd", await manager.getProducts());
        res.status(200).send("Product deleted successfully")
    } catch {
        res.status(400).send("Error deleting product: ", err)
    }
    
})




export default router;