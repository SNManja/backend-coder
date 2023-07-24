
class Cart {

    static #cartId = 0;
    #list
    #id
    constructor(){
        this.#id = this.#createCartId()
        this.#list = [];

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

class CartManager {

    #list
    constructor(){
        this.#list = []
    }

    getCartList (){
        let lista = this.#list
        return lista
    }

    getCart(id){
        return this.#list.find((cart)=> parseInt(cart.getCartId()) == parseInt(id) )
    }

    addCart (cart){
        try{
            if ( cart instanceof Cart ){
                this.#list.push(cart) 
            } else {
                throw new Error("Not a cart");
            }
        } catch (err) { 
            console.error(err)
        }
    }
}

export { Cart, CartManager };

