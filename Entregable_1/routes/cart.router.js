import { Router } from "express";
import { Cart, CartManager } from "../src/cart.js";

const router = Router()

let cartList = new CartManager ("cart.json")

 
router.post("/", (req, res) => {
    try{
        let carrito = new Cart ()

        cartList.addCart(carrito)

        res.send("Cart "+ carrito.getCartId() +" created")
    } catch (err){
        console.error(err)
    }
})

router.get("/:cid", (req, res) => {
    try {
        console.log(req.params.cid)
        let cart = cartList.getCart(parseInt(req.params.cid)) 
        if(!cart){ throw new Error("Cart not found")}
        console.log("Cart found", cart )
        res.status(200).send(cart)
    } catch (err){
        console.log("Cart not found")
        res.status(400).send(err)
    }
})

router.post("/:cid/product/:pid/", (req, res) => {
    try {
        let cid = parseInt(req.params.cid)
        let pid = parseInt(req.params.pid)
        let cart = cartList.getCart(cid)
        
        cart.addProduct(pid)

        res.status(200).send( `Cart id-${cid} contains Prod id-${pid} ${cart.countProducts(pid)} times`)
    } catch (err){
        res.status(400).send("Trouble adding product into cart")
    }
})


export default router;