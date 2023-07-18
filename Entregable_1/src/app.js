
// Me vi con el problema de que todo termina eestando dentro de una funcion async. No se si eso ees una buena practica? Que otra posibilidad tengo? Como puedo hacer mas claro el codigo?

import express from "express";
import { Product, ProductManager } from "./productManager.js";

let prodManPath = "./src/productLists/example.json"
let PORT = 8080
let manager = new ProductManager(prodManPath)

let prod1 = new Product("manzana", 3, "url", 1, "ABC-123")
let prod2 = new Product("cebolla", 2, "url", 6, "AEF-122")
let addProductList = [prod1, prod2]

async function productListAdd_er(list){
    for (let prod in list) {
        await manager.addProduct(list[prod])
    }
}
productListAdd_er(addProductList)



const app = express()

// Middleware para el req.query
app.use(express.urlencoded({extended: true}))

async function Apertura (){

    // Llamo getProducts y actualizo el manager.products en la memoria
    await manager.getProducts()

    app.get("/", (req, res)=>{
        res.get("MAIN PAGE")
    })
    
    app.get("/products/", (req, res)=> {
        let num = parseInt(req.query.limit)
        let prodList = [...manager.products]

        while (prodList.length != num && prodList.length && num) {
            prodList.pop()
        }

        res.send(prodList)
    })
    
    app.get("/products/:pid", async (req, res)=> {
        // NOTA: getProductById por default lo arme para que funcione sincronicamente con memoria
        let prod = manager.getProductById(parseInt(req.params.pid))

        // Podria checkear en caso de not found que tire algun error?
        res.send(prod)
    })

    app.listen(PORT, ()=> {
        console.log("connected to port", PORT)
    })

}

Apertura()