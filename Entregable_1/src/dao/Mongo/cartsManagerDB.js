
import { cartsModel } from "./models/carts.model.js";


class CartManagerDB {

    async readFile() {

        try{
            return await cartsModel.find()
        } catch {
            console.log("cant reach db")
        }
       
    }

    async getCartList (){
        this.list = await this.readFile()
        return this.list
    }

    async getCartById(cid) {
        try {
            const cart = await cartsModel.findById(cid).populate("list.prodID");
            return cart
        } catch (err){
            console.log(err.message)
        }
        
      

    }

    async addCart (cart){
        try {
            return await cartsModel.create(cart);
        }
        catch (err) {
            console.log(err)
        }
    }

    async removeCart (id) {
        try {
            return await cartsModel.findByIdAndDelete(id)
        }
        catch (err) {
            console.log("error deleting prod: ",err)
        }

       
    }

    async addProductsToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);

            if (!cart) {
                console.log(`Cart with id ${cid} not found.`);
                return;
            }

            let prodIndex = cart.list.findIndex((prod)=>{
                return prod.prodID == pid;
            })
           
            if (prodIndex == -1){
                let newProd = {
                    prodID: pid,
                    quantity: 1,
                }
                cart.list.push(newProd)
            } else{
                cart.list[prodIndex].quantity += 1;
            }
            console.log(cart)
           
            
            cart.save();
        } catch (err) {
            console.error(err)
        }
    }

    
    async deleteProdFromCart (cid,pid){
        try{
            const cart = await cartsModel.findById(cid);
    
            if (!cart) {
                console.log(`Cart with id ${cid} not found.`);
                return;
            }
          
            let prodIndex = cart.list.findIndex((prod)=>{
                return prod.prodID == pid;
            })
            if (prodIndex !== -1) {
                cart.list[prodIndex].quantity -= 1;
                if(cart.list[prodIndex].quantity <= 0){
                    cart.list.splice(prodIndex, 1);
                }
                await cart.save();
            }
    
            return cart;
        } catch (e) {
            console.error(e);
        }
    }

   async cleanCart(cid){
        try{
            const cart = await cartsModel.findOne({id: cid});
            if (!cart) {
                console.log(`Cart with id ${cid} not found.`);
                return;
            }
            cart.list = []
            await cart.save()
        }catch (e) {
            console.error(e);
        }
   }

   async updateCartProd(cid, pid, newQuant){
        try{
            const cart = await cartsModel.findById(cid);
            if (!cart) {
                console.log(`Cart with id ${cid} not found.`);
                return;
            }
            let prodIndex = cart.list.findIndex((prod)=>{
                return prod.prodID == pid;
            })

            if (prodIndex !== -1) {
                cart.list[prodIndex].quantity = newQuant;
                
                await cart.save();
            } else {
                let newProd = {
                    prodID: pid,
                    quantity: newQuant,
                }
                cart.list.push(newProd)
            }
            await cart.save();
            return cart;
        } catch (e) {
            console.error(e);
        }
    }
}

export { CartManagerDB };

