import { Router } from "express";
import { Cart, CartManager } from "../src/cart.js";

const router = Router()

let cartList = new CartManager ("cart.json")

 
router.post("/", async (req, res) => {
    try{
        let carrito = new Cart ()

        let id = await cartList.addCart(carrito)

        res.send("Cart "+ cartList.getCartId(id) +" created")
    } catch (err){
        console.error(err)
    }
})

router.get("/:cid", async (req, res) => {
    try {
        console.log(req.params.cid)
        let cart = await cartList.getCartById(parseInt(req.params.cid)) 
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
        let cid = parseInt(req.params.cid)
        let pid = parseInt(req.params.pid)
        
        await cartList.getCartList()
       
        let ind = cartList.list.findIndex((cart) => cart.id === cid)
        
        console.log(ind)
        console.log("AAAAAS",cartList["list"][ind]["list"])
        cartList["list"][ind]["list"].push(pid)
        
        await cartList.writeFile(cartList["list"])
        
        res.status(200).send( `Cart id-${cid} contains Prod id-${pid} ${cart.countProducts(pid)} times`)
    } catch (err){
        res.status(400).send("Trouble adding product into cart")
    }
})


export default router;