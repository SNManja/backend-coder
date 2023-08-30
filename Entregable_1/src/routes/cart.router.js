import { Router } from "express";
import { Cart, CartManager } from "../dao/Filesystem/cartManager.js";
import { CartManagerDB } from "../dao/Mongo/cartsManagerDB.js";

const router = Router()


// This one is for MongoDB
let cartList = new CartManagerDB();

// This one is for filesystem
let carteList = new CartManager ("cart.json")

 
router.post("/", async (req, res) => {
    try{
        let carrito = new Cart ()

        let id = await cartList.addCart(carrito)

        res.send("Cart "+ id +" created")
    } catch (err){
        console.error(err)
    }
})

router.get("/:cid", async (req, res) => {
    try {
        let cart = await cartList.getCartById(req.params.cid)
        //if(!cart){ throw new Error("Cart not found")}
        console.log("Cart found", cart )
        res.status(200).send(cart)
    } catch (err){
        console.log("Cart not found")
        res.status(400).send(err)
    }
})

router.post("/:cid/product/:pid/", async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        

        await cartList.addProductsToCart(cid, pid)
        
        res.status(200).send( `Cart id-${cid} added product ${pid}`)
    } catch (err){
        console.log(err)
        res.status(400).send("Trouble adding product into cart")
    }
})


// 2nda entrega 
router.delete("/:cid/products/:pid", async (req,res)=> {
    try {

        let cid = req.params.cid
        let pid = req.params.pid

        await cartList.deleteProdFromCart(cid, pid)
       
        res.status(200).send( `Cart id-${cid} del product ${pid}`)
    } catch(e){
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/:cid", async (req, res)=> {

    let listJSON = req.body.list
    let cid = req.params.cid
    try{
        listJSON.forEach(async (prod)=>{
            await cartList.updateCartProd(cid, prod.prodID, prod.quantity)
        })
        res.status(200).send( `Cart id-${cid} updated ${pid}`)
    } catch (err) {
        console.error(e);
    }
   
})

router.put(":cid/products/:pid", async (req, res) => {
    // modifica la cantidad de ejemplares del producto. Osea stock
    console.log("PORQUE NO PASA POR ACAAAAAAAAAAAAAAAAAAAAA")
    let cid = req.params.cid
    let pid = req.params.pid
    let quant = req.body.quantity
    console.log("quant", quant)
    try{
        await cartList.updateCartProd(cid, pid, quant)
        res.status(200).send( `Cart id-${cid} updated ${pid}`)
    } catch (err) {
        console.error(e);
    }

})

router.delete(":cid", async (req, res) => {
    try {

        let cid = req.params.cid
        
        await cartList.cleanCart(cid)
       
        res.status(200).send( `Cart id-${cid} is now empy`)
    } catch(e){
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
})

export default router;