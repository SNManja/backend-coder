const fs = require("fs")

class ProductManager {
    static id = 0;
    constructor(path) {
        //this.products = []; Lo elimino porque ahora trabajo todo desde archivos, no mas en le memoria
        this.path = path
    }

    getID() {
        // Checkea que no exista el id
        while (this.getProductById(ProductManager.id) !== "Not found"){
            ProductManager.id++;
        }
        return ProductManager.id;
    }
    async addProduct(product) {
        // cambia valores en archivo
        let archivo = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        // Este archivo JSON es una lista de objetos
        archivo.push({...product, id: ProductManager.getID()})

        fs.promises.writeFile(this.path,JSON.stringify(archivo), () => {
            console.log("Error, cant reach path")
        })
  
    }
    async getProducts() {
        // Leer archivo de producto y devolverlos en formato de arreglo
        try{
            let checkProducts = JSON.parse(await fs.promises.readFile(this.path, "utf-8")) // busca en path
        } catch {
            checkProducts = []
        }
        return checkProducts;
    }
    async getProductById(id){
        // LEER ARCHIVO Y BUSCA POR ID
        let productList = this.getProducts()
        let product = productList.find(product => product.id === id);
        
        return product ? product : "Not found";
    }
    

    updateProduct(id,atributo){
        // Ya con getProducts obtengo los archivos actualizados
        // Estos siempre trabajando con los datos actualizados, porque los tomo directo del archivo JSON.
        // Deberia cambiar este comportamiento?

        // En caso que si, deberia volver a reestablecer la lista de productos y trabajar con datos en la memoria
        // para luego usar este metodo para actualizarlos.
        // Esto lo veo raro, porque si yo por ejemplo elimino un objeto, reescribo sobre los ultimos datos actualizados en el archivo
        
        /*
            Ejemplo:
            1- Usuario toma productos, los guardo en la memoria
            
            2- Hay un cambio en base de datos

            3- Elimino un producto, actualizo base de datos

            4- Elimine los cambios del 2ndo paso

            Por este motivo no comprendo porque implementaria esto trabajando desde la memoria,
            a pesar de que brinde mayor rapidez, tenderia mas facil a errores. No?
        */
        
    }


    deleteProduct(id) {

        let listaProducto = this.getProducts()

        listaProducto.filter(elem => elem.id == id) // Puedo hacerlo por id. Esto me parecio mas preciso 
        fs.promises.writeFile(this.path,JSON.stringify(listaProducto), () => {
            console.log("Error, cant reach path")
        })
        return listaProducto
    }

    //DELETE PRODUCT
    // recibe id y elimina el producto del archivo
}
class Product { 
    constructor(title, price, thumbnailURL, stock, code) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnailURL;
        this.stock = stock;
        this.code = code;
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