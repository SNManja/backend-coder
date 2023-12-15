import { Router } from "express";
import { genMockProdList } from "../mock-functions.js";
import { productService } from "../services/factory.js";
import { authAdmin, authToken } from "../utils.js";


const router = new Router()



router.get("/",authToken, async (req,res)=> {
    
    res.render("home")
})

router.get("/mock", authToken, authAdmin, async (req,res)=> {

    // Con esto activo o desactivo los mock
    let addMockProducts = true;

    let OGprodList = []
    try {
        OGprodList = await productService.getProducts()

    } catch(err){
        console.log("Couldnt get products")
    }

    let prodList = []
    if(!addMockProducts){
        OGprodList.forEach((prod) =>{
            let newProd = {}
            newProd.title = prod.title
            newProd.desc= prod.desc
            newProd.price = prod.price
            newProd.status = prod.status
            newProd.stock = prod.stock
            newProd.code = prod.code
            prodList.push(newProd)
        })
    } else {
        prodList = genMockProdList()
    }

    res.render("mock",  {prodList} )
})


router.get("/products",authToken, (req, res) => {

    res.render("products", {})
})






export default router;
