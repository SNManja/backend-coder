

class ProductManager {
    constructor() {
        this.products = [];
    }
    
    getID() {
            ProductManager.id++;
            return ProductManager.id;
    }
    addProduct(product) {
        this.products.push(product);
    }
    getProducts() {
        return this.products;
    }
    getProductById(id){
        let product = this.products.find(product => product.id === id);
        return product ? product : "Not found";
    }
}
class Product { 
    // El contador de productos lo queremos global. No?
    // En caso contrario lo puedo poner en ProductManager y que el id del producto cambie dependiendo de cada manager, pero me parecia mas apropiado la id de los productos en productos
    static id = 0;
    constructor(title, price, thumbnailURL, code, stock) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnailURL;
        this.code = code
        this.id = this.getID()
        this.stock = stock;
    }
    getID() {
        Product.id++;
        return Product.id;
}
    
}
/*
    Debugging and testing 

    let product1 = new Product("manzana", 20, "example.com", "abc-123", 4)
    let product2 = new Product("pera", 10, "example.com","efg-456", 1)

    let manager = new ProductManager()
    manager.addProduct(product1)
    manager.addProduct(product2)

    console.log(manager.getProductById(2));
*/