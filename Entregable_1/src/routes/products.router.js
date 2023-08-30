import { Router } from "express";
import { manager, socketServer } from "../app.js";
import { Product } from "../dao/Filesystem/productManager.js";
import { uploader } from "../utils.js";


const router = Router()


async function socketEmitter(){
    socketServer.emit("reloadProd", await manager.getProducts());
}

// main /api/products page
router.get("/", async function (req, res) {
    try {
       
        let prodList = await manager.getProducts(req.query)
        let limit = parseInt(req.query.limit)
        

    
        while (prodList.length != limit && prodList.length && limit) {
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

    let prod = await manager.getProductById(req.params.pid)
    
    res.send(prod)
})



router.post("/", uploader.array("thumbnails"), async(req,res)=>{
    let prodJSON = req.body 
    let prod
    
    try {
        if (!req.files ) { throw new Error("No thumbnails")}
        prod = new Product(prodJSON.title, prodJSON.desc, prodJSON.code, prodJSON.price, prodJSON.stock, prodJSON.category, req.files)
        let result = await manager.addProduct(prod)
        console.log("product: ",prod)
        socketEmitter()
        
        res.send({ status:"Product created successfully", payload: result  })
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
        await manager.updateProduct(req.params.pid, campo  )
        socketEmitter()

        res.status(200).send("Product updated successfully"+ String( await manager.getProductById(req.params.pid) ) )
    } catch (err){
        res.status(400).send("Error updating product: ", err)
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        await manager.deleteProduct(req.params.pid)
        socketEmitter()

        res.status(200).send("Product deleted successfully")
    } catch {
        res.status(400).send("Error deleting product: ", err)
    }
    
})




export default router;