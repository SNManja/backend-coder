
import { productModel } from "./models/product.model.js";


class ProductManagerDB {

    async getProducts(thisquery = {}) {
        try {
            const find = {}
            if (thisquery.query){
                find["title"] = thisquery.query
            }
           
            if( thisquery.page || thisquery.limit){
               
                const options = {
        
                    page: parseInt(thisquery.page) || 1 ,    // 1 by default
                    limit: parseInt(thisquery.limit) || 10, // 10 by default
                    sort: {price: parseInt(thisquery.sort)} 
                }
                
                let checkProducts = await productModel.paginate(find, options)
                
                console.log(checkProducts);
                return checkProducts["docs"]


            } else {
                let checkProducts = await productModel.find(find)
                if (thisquery.sort){
                    checkProducts = checkProducts.sort({price: parseInt(thisquery.sort)})
                }
                return checkProducts
            }
            
            
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




export { ProductManagerDB };

