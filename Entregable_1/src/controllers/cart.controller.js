import { Cart } from "../dao/Filesystem/cartManager.js";
import { cartService } from '../services/factory.js';


export async function addNewCart(req, res) {
    try{
        let carrito = new Cart ()

        let id = await cartService.addCart(carrito)

        res.send({ carrito: id })
    } catch (err){
        console.error(err)
    }
}

export async function findCartById(req, res){
    try {
        let cart = await cartService.getCartById(req.params.cid)

        res.status(200).send({ carrito: cart })
    } catch (err){
        console.log("Cart not found")
        res.status(400).send(err)
    }
}

export async function addProductToCart (req, res) {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        

        await cartService.addProductsToCart(cid, pid)
        
        res.status(200).send( `Cart id-${cid} added product ${pid}`)
    } catch (err){
        console.log(err)
        res.status(400).send("Trouble adding product into cart")
    }
}

export async function deleteProductFromCart (req,res) {
    try {

        let cid = req.params.cid
        let pid = req.params.pid

        await cartService.deleteProdFromCart(cid, pid)
       
        res.status(200).send( `Cart id-${cid} del product ${pid}`)
    } catch(e){
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
}

export async function updateProductInCart (req, res) {

    let listJSON = req.body.list
    let cid = req.params.cid
    try{
        listJSON.forEach(async (prod)=>{
            await cartService.updateCartProd(cid, prod.prodID, prod.quantity)
        })
        res.status(200).send( `Cart id-${cid} updated ${pid}`)
    } catch (err) {
        console.error(e);
    }
   
}

export async function updateStockInCart (req, res) {
    // modifica la cantidad de ejemplares del producto. Osea stock

    let cid = req.params.cid
    let pid = req.params.pid
    let quant = req.body.quantity
    try{
        await cartService.updateCartProd(cid, pid, quant)
        res.status(200).send( `Cart id-${cid} updated ${pid}`)
    } catch (err) {
        console.error(e);
    }

}

export async function deleteCart (req, res) {
    try {

        let cid = req.params.cid
        
        await cartService.cleanCart(cid)
       
        res.status(200).send( `Cart id-${cid} is now empy`)
    } catch(e){
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
}