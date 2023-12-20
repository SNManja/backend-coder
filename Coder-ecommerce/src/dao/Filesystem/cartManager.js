import fs from "fs";

class CartManager {
    #path
    static cartId = 1
    constructor(){
        this.list = []
        this.#path = "./src/dao/Filesystem/storage/Carts/cart.json"
        this._initializePath();
    }

    

    async _initializePath() {
        let p = this.#path.split("/")

        p.pop()

        p = p.join("/")

        fs.mkdir(p, { recursive: true }, (err) => {
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
            await this.getCartList()
            exists = true;
        } catch (err) {
            console.log("File does not exist");
            await fs.promises.writeFile(this.#path, "");
        }
        if (!exists) await fs.promises.writeFile(this.#path, "")
        
    }

    async writeFile(cartMan) {
        try {
            console.log("this will be written:",cartMan);
            await fs.promises.writeFile(this.#path, JSON.stringify(cartMan))
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
        this.list = await this.readFile()
        return this.list
    }

    async getCartById(id) {
        
        let res = this.list.find((cart) => parseInt(cart.id) === parseInt(id));
    
        return res  != undefined ? res : false

    }

    async addCart (cart){
        try{
            await this.getCartList();
            if ( cart instanceof Cart ){
                let id = await this.getCartId()
                this.list.push( { ...cart , id: id } ) 
                await this.writeFile(this.list)
                return id
            } else {
                throw new Error("Not a cart");
            }
        } catch (err) { 
            console.error(err)
        }
    }

    async getCartId() {
        try {
            

            let nextId = CartManager.cartId;
           
            while ( await this.getCartById(nextId) != false ) {
                
                nextId++;
            }
            
            return nextId;
        } catch (err) {
            console.log("couldnt get id");
            console.error(err);
        }
    }

    async addProductsToCart(cid, pid) {
        await this.getCartList()

        let ind = this.list.findIndex((cart) => cart.id == cid);

        this["list"][ind]["list"].push(pid)
        
        await cartList.writeFile(cartList["list"])
    }


}


class Cart {


    constructor(){
        this.list = [];  
    }

    getCart(){
        return this.list
    }

    countProducts(id){
        return this.list.reduce((count, prodId )=> {
            return prodId == id ? count+1 : count;
        }, 0)
    }

    addProduct (prodId){
        try{
            this.list.push( prodId ) 

 
        } catch (err) { 
            console.error(err)
        }
    }

}



export { Cart, CartManager };

