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

    async getCartById(id) {
        
        return await cartsModel.findById(id)

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
            
            console.log("adding products")
            return await cartsModel.findByIdAndUpdate(
                cid,
                { $push: { list: pid } },
                { new: true }
            );
        } catch (err) {

            console.error(err)
        }
    }

}





export { CartManagerDB };

