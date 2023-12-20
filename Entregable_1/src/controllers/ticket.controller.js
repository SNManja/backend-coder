import { productService, ticketService } from '../services/factory.js';
import { getUserCart } from "../utils.js";

export async function createTicket(req,res){
    try{
        let ticket = await ticketService.createTicket(req.params.uid,req.params.cid)
        
        let cart = await getUserCart(req.params.cid);

        cart.list.forEach(async elem =>{

            let prod = elem.prodID
            let stock = prod.stock
            let quantity = elem.quantity
            
            if(quantity > 0 && stock > 0 && quantity <= stock ){
                let campo = {
                    stock: stock - (quantity),
                }

                await productService.updateProduct(prod._id,campo)
            }
        })
            
        res.send(ticket)
    } catch (err) {
        console.error("Error with checkout of the ticket", err.message) 
    }
}

export async function findTicket(req, res) {
    try {
        let ticket = await ticketService.getTicket(req.params.tid)
        res.status(200).json(ticket)
    } catch (err) {
        res.status(500).json(err)
    }
}

