

/*


    Consigna:

    Desarrollar un servidor basado en express donde podamos hacer consultas
    a nuestro archivo de productos

    Aspectos a incluir
        - OK - Se debera utilizar la clase productManager que actualmente utilizamos 
        con persistencia de archivos
        - OK  -Desarrollar un servidor express que en su archivo app.js, importe al archivo de product manager
        - El servidor debe contar con los siguientes endpoint:
            - Ruta "/products" que debe leer el archivo de productos y devolverlos dentro de un objeto
            - Agregar soporte para recibir por query param el valor ?limit= el cual recibe el limite de resultados
            - Si no se recibe query de limite se devolveran todos los productos
            - Si se recibe un limite, solo devolver el numero de productos solicitados
            - Ruta "products/:pid" la cual debe recibir por req.params ele pid (product id) y devolver solo el producto solicitado, en lugar de todos los productos.
*/ 

// resumen
// ENDPOINTS: 
        // - Ruta /products -> Lee archivo productos y los devuelve dentro de un objeto
        // - Agregar soporte para recibir query param eel valor ?limit= el cual recibe el limite de resultados (sin limite se devulven todos los results)
        // - Ruta "/products/:pid" debe recibir por req.params el pid (product id) y devolver solo el solicitado
        

/*
    Notas mias: 
    que pingo es un endpoint
    hacer sv en app y importar ahi todo

    Utilizar un archivo qeu tenga productos, pues el desafio solo es para gets

*/ 

import express from "express";
import { Product, ProductManager } from "./productManager.js";

let prodManPath = "./productLists/example.json"
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

app.get("/", (req, res)=>{
    res.get("MAIN PAGE")
})

app.get("/products/", (req, res)=> {
    res.send(manager.getProducts())
})

app.listen(PORT, ()=> {
    console.log("connected to port", PORT)
})