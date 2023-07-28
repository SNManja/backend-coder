import fs from "fs";

class CartManager {
    #path
    #list
    constructor(fileName){
        this.#list = []
        this.#path = "./src/Carts/"+ fileName
        this._initializePath();
    }

    
    async _initializePath() {
        let p = this.#path.split("/")

        p.pop()

        p = p.join("/")


        await fs.mkdir(p, { recursive: true }, (err) => {
            if(err){
                console.error("Error creating directory", err)

            } else {
                console.log("Directory created ", p)
            }
        });
         
        // check if file exists
        let exists = false
        try {
            await fs.promises.access(this.#path, fs.constants.F_OK);
            console.log("File exists");
            await this.getCart()
            exists = true;
        } catch (err) {
            console.log("File does not exist");
            await fs.promises.writeFile(this.#path, "");
        }

        if (!exists) await fs.promises.writeFile(this.#path, "")

    }

    async writeFile(cartList) {
        try {
            console.log("this will be written:",cartList);
            await fs.promises.writeFile(this.#path, JSON.stringify(cartList))
            console.log("file written")
            
        } catch {
            console.error("Error writing file")
        }
        
    }

    async readFile() {
        let file
        try{
            file = await fs.promises.readFile(this.#path, "utf-8");    
            if (file == "") return []
        } catch {
            console.log("cant reach file")
        }
        return JSON.parse(file);
    }

    async getCartList (){
        this.#list = await this.readFile()
        return this.#list
    }

    getCartById(id){
        return this.#list.find((cart)=> parseInt(cart.getCartId()) == parseInt(id) )
    }

    addCart (cart){
        try{
            if ( cart instanceof Cart ){
                this.#list.push(cart) 
                this.writeFile()
            } else {
                throw new Error("Not a cart");
            }
        } catch (err) { 
            console.error(err)
        }
    }
}


class Cart {

    static #cartId = 0;
    #list
    #id
    constructor(){
        this.#id = this.#createCartId()
        this.#list = [];  
    }

    getCart(){
        return this.#list
    }

    #createCartId(){
        Cart.#cartId++
        return Cart.#cartId;
    }

    getCartId(){
        return this.#id;
    }

    countProducts(id){
        return this.#list.reduce((count, prodId )=> {
            return prodId == id ? count+1 : count;
        }, 0)
    }

    addProduct (prodId){
        try{
            this.#list.push( prodId ) 

 
        } catch (err) { 
            console.error(err)
        }
    }

}



export { Cart, CartManager };

