import { Router } from "express";
import * as productController from "../controller/product.controller.js";

const router = new Router()



router.get("/", async (req,res)=> {

    let OGprodList = []
    try {
        OGprodList = await productController.getProducts()

    } catch(err){
        console.log("Couldnt get products")
    }


    let prodList = []


    // Esto es horrendo, pero fue la unica solucion a un conflicto con handlebars que encontre. No me permitia pasar directamente los valores que llegaban de la database por un tema de seguridad
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


    console.log(prodList)
    res.render("home",  {prodList} )
})


router.get("/realTimeProducts", (req, res) => {

    res.render("realTimeProducts", {})
})






export default router;
