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
        if(!cart){ throw new Error("Cart not found")}
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


export default router;