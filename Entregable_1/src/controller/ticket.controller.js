import { ticketService } from '../services/factory.js';
import { getUserCart } from "../utils.js";

export async function checkoutTicket(req,res,next){
    try{
        let ticket = await ticketService.createTicket(req.user.email,req.user.cart)
        
        let cart = await getUserCart(req.user.cart)
        console.log(cart)
        cart.list.forEach(async elem =>{

            let prod = elem.prodID
            let stock = prod.stock
            let quantity = elem.quantity
            console.log(stock, quantity, prod._id)
            
            if(quantity > 0 && stock > 0 && quantity <= stock ){
                let campo = {
                    stock: stock - (quantity),
                }
  
                fetch(`http://localhost:8080/api/products/${prod._id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(campo),
                }).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                })
            }
        })
            
        console.log("GET HERE")
        req.ticket = ticket;
        next();
    } catch (err) {
        console.error("Error with checkout of the ticket", err) 
    }
}