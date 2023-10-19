import { productService } from '../services/factory.js';


export async function getProducts (req, res) {
    try {
       
        let prodList = await productService.getProducts(req.query)
        let limit = parseInt(req.query.limit)
        

        while (prodList.length != limit && prodList.length && limit) {
            prodList.pop()
        }
      
        res.send(prodList)
        
    } catch (err){
        console.error(err)
        res.status(500).json({error: "Products not found"})
    } 
}

export async function getProductsById (req, res) {

    let prod = await productService.getProductById(req.params.pid)
    
    res.send(prod)
}

export async function addProduct (req,res){
    let prodJSON = req.body 
    let prod
    
    try {
        if (!req.files ) { throw new Error("No thumbnails")}
        prod = new Product(prodJSON.title, prodJSON.desc, prodJSON.code, prodJSON.price, prodJSON.stock, prodJSON.category, req.files)
        let result = await productService.addProduct(prod)
        console.log("product: ",prod)
        socketEmitter()
        
        res.send({ status:"Product created successfully", payload: result  })
    } catch (err){
        console.log("err: ",err.message)
        res.status(400).send("Not able to create product")
        
    }
    
    
}

export async function getProductById (req, res) {
    try {
        let campo = req.body
        
        if ( !campo ){
            throw new Error('Nothing to update');
        }
        await productService.updateProduct(req.params.pid, campo  )
        socketEmitter()

        res.status(200).send("Product updated successfully"+ String( await productService.getProductById(req.params.pid) ) )
    } catch (err){
        res.status(400).send("Error updating product: ", err)
    }
}

export async function deleteProductById  (req, res) {
    try {
        await productService.deleteProduct(req.params.pid)
        socketEmitter()

        res.status(200).send("Product deleted successfully")
    } catch {
        res.status(400).send("Error deleting product: ", err)
    }
    
}