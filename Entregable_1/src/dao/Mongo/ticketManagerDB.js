import { getUserCart } from "../../utils.js";
import { ticketModel } from "./models/ticket.model.js";

class ticketManager {

    async createTicket(purchaser, cartID){
        try{
            console.log(purchaser)
            let total = 0;
            console.log("usuario", cartID)
            let cart = await getUserCart(cartID);
            
            cart.list.forEach((prod) =>{
                console.log(prod.prodID.stock,prod.prodID.price, prod.quantity)
                if (prod.prodID.stock < prod.quantity) {
                    prod.quantity = 0;
                }
                total += prod.quantity * prod.prodID.price;
            })
            
            let ticket = {
                code: "", // Como autogenero?
                purchaser: purchaser,
                amount: total,
                
            }
            
            return await ticketModel.create(ticket);
        } catch (err) {
            console.error("error creating ticket", err)
        }
    }
}

export { ticketManager };

