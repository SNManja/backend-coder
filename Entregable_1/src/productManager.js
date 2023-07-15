

/*
    https://github.com/MonkiManja

    Me costo mucho comprender como es la idea del enunciado. Extendi el ProductManager, porque me era confuso el cuando tengo que trabajar en la memoria y cuando en archivos
    Aproveche esto y intente implementar el principio de single responsability y evitar hacer un codigo spaghetti de entrada. 
     Mi idea era pensar productManager como el trato de productos en la memoria y heredar de esta clase cuando trabajo con Archivos. Facilitando a la vez la mantencion.
    
    Agregue estos metodos que no estaban dentro de la consigna:
    - writeFile y readFile: Modulariza la escritura y lectura de los archivos
    - getProductById: Edite los argumentos, agregue uno que da por default false. En este segundo argumento, la idea es pasar la lista de objetos cuando trabaje con archivos.
    - addProductToFile: Como addProduct pero al archivo, envez de this.products

    Quise mantenerme fiel al enunciado y no modifique ciertos nombres, pero si se puede, me gustaria cambiar los metodos relacionados a file con algo que lo aclare al principio:
    Por ej: updateProduct => FileUpdateProduct
    Pudiendo diferenciar mas facil de donde viene uno y otro, similar a como hace la libreria fs con nombres de sync para diferenciar sincronico

    Cualquier recomendacion/correccion, aunque se vaya de los temas del curso estoy mas que interesado en saberla :)
    Principalmente como puedo manejar realisticamente los errores (fuera del console.log()) y mejorar la claridad del codigo.
    
*/ 

const fs = require("fs")

class ProductManager { 
    static id = 0;
    constructor() {
        this.products = []; 
    }

    getID() {
        // Checkea que no exista el id
        while (this.getProductById(ProductManager.id) !== "Not found"){
            ProductManager.id++;
        }
        return ProductManager.id;
    }
    addProduct(product) {
        this.products.push({...product, id: ProductManager.getID()})
    }
    
    getProductById(id, file = false){ 
        let productList
        if (file) {
            productList = file
        } else {
            productList = this.products 
        }
        let product = productList.find(product => product.id === id);
        return product ? product : "Not found";

    }

}

// Manteniendo el principio de Single responsability. Voy a trabajar separando el trato del productManager en memoria y en archivo
class FileManagement extends ProductManager {
    // FileManagement le agrega componentes de manejo de archivos al ProductManager
    constructor(path){
        this.path = path;
        this._initializePath();
    }

    // Esto me permite crear el directorio que necesito al crear la instancia
    async _initializePath(){ // Hago el metodo privado ya que solo me interesa usarlo en la inicializacion 
        fs.mkdir(this.path, { recursive: true });
    }

    async writeFile(productList){
        fs.promises.writeFile(this.path,JSON.stringify(productList))
            .then(() => console.log("File written " + this.path))
            .catch(() => console.log("Cant write file in " + this.path))
    }
    async readFile(){
        let file = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            .then(()=> console.log("File read " + this.path))
            .catch(()=> console.log("Cant read file in " + this.path))
        return file
    }

    async getProducts() {
        // Leer archivo de producto y devolverlos en formato de arreglo
        // Este metodo en si es medio redundante, pero para mayor legibilidad, prefiero dividir la lectura y escritura del archivo en nombres similares
        let checkProducts = await this.readFile() 
        return checkProducts
    }

    async deleteProduct(id) {
        let listaProducto = await this.getProducts()

        listaProducto = listaProducto.filter(elem => elem.id != id) 
        this.writeFile(listaProducto)
        return listaProducto
    }

    async addProductToFile(product){
        let file = await this.getProducts()
        file.push(product)
        this.writeFile(file)
    }

    async updateProduct(id, campo){
        let file = await this.getProducts()

        // Obtengo los productos
        let memoryProd = this.getProductById(id) // Es poco claro esto, por eso queria marcar el file en los metodos que modifican el archivo.
                                                // Leeyendo el codigo, no se lee facil que getProductById es para memoria y getProducts para archivos
                                                // Con el cambio que planteo seria fileGetProducts, asi se distinguiria mas facil las funcionalidades

        if (memoryProd == "Not found"){
            console.log("Error, item not found in memory")
            return
        }
        // Edito el objeto en file
        let changed = false
        for (let i = 0; i< file.length; i++){
            
            if (file[i]["id"] == id){
                changed = true
                file[i][campo] = memoryProd[campo]
                break
            }
        }
        if (changed == false) console.log("Nothing changed")
        this.writeFile(file)
    }
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
