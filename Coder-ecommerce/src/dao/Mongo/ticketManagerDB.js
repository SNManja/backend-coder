import { getUserCart } from "../../utils.js";
import { ticketModel } from "./models/ticket.model.js";

class ticketManager {

    async createTicket(purchaser, cartID){
        try{
            
            let total = 0;
            let cart = await getUserCart(cartID);
            
            cart.list.forEach((prod) =>{
                console.log(prod.prodID.stock,prod.prodID.price, prod.quantity)
                if (prod.prodID.stock < prod.quantity) {
                    prod.quantity = 0;
                }
                total += prod.quantity * prod.prodID.price;
            })
            
            let ticket = {
                code: "", 
                purchaser: purchaser,
                amount: total,
                
            }
            
            return await ticketModel.create(ticket);
        } catch (err) {
            console.error("error creating ticket", err.message)
        }
    }

    getTicket(tid){
        try{
            return ticketModel.findById(tid);
        } catch (err) {
            console.error("Error finding ticket", err.message)
        }
    }
}

export { ticketManager };

