
import { productModel } from "./models/product.model.js"

class ProductManagerDB {

    async readFile() {
        return await productModel.find()
    }

    async getProducts() {
        try {

            let checkProducts = await this.readFile()
            return checkProducts
        } catch (e) {
            console.log("getProducts error: ", e)
            return []
        }
    }


    async addProduct(product) {
        try{
            return productModel.create(product)
        } catch (err) { 
            console.log("error:", err)
        }
    }

    async getProductById(id) {

        try {
       
            return await productModel.findById(id)
        } 
        catch (err){
            console.log(err)
        }
    }



    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id);
        }
        catch (err) {
            console.log(err)
        }
    }



    async updateProduct(id, campo) {
        try {
            return await productModel.findByIdAndUpdate(id, campo, { new: true });
        } catch (err) {
            console.error(err)
        }
    }
};




export default ProductManagerDB 

