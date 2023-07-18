
import fs from "fs";

class ProductManager {
    #path

    static id = 0;
    constructor(path) {
        this.products = [];
        this.#path = path;
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
            exists = true;
        } catch (err) {
            console.log("File does not exist");
            await fs.promises.writeFile(this.#path, "");
        }
        if (!exists) await fs.promises.writeFile(this.#path, "")
        
    }

    async writeFile(productList) {
        try {
            await fs.promises.writeFile(this.#path, JSON.stringify(productList))
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

    async getProducts() {
        try {

            let checkProducts = await this.readFile()
            this.products = checkProducts
            return checkProducts
        } catch (e) {
            console.log("getProducts error: ", e)
            return []
        }
    }

    getID() {
        // No checkeo en el archivo porque esto lo uso solo cuando agrego un productos y eso actualiza antes this.products
        while (this.getProductById(ProductManager.id, this.products) !== "Not found"){
            ProductManager.id++;
        }
        return ProductManager.id;
    }

    async addProduct(product) {
        try{
            if (product instanceof Product){

                this.products = await this.getProducts()
                let id = this.getID()
                this.products.push({id,...product});

                await this.writeFile(this.products);

            } else {
                console.log("not a product")
            }
        } catch (e) { 
            console.log("error:", e)
            return 
        }
    }

    getProductById(id, file = false) {
        // Tener en cuenta que el segundo valor es para pasar la lista del archivo
        let productList;
        if (file) {
            productList = file;
        } else {
            productList = this.products;
        }
        let product = productList.find(product => product.id === id);
        return product ? product : "Not found";

    }



    async deleteProduct(id) {
        let listaProducto = await this.getProducts();

        listaProducto = listaProducto.filter(elem => elem.id != id);
        this.products = listaProducto // Esta bien esto?
        this.writeFile(listaProducto);
        return listaProducto;
    }



    async updateProduct(id, campo) {
        try {
            const product = await this.getProductById(id);
            const allProducts = await this.getProducts();

            const filtrado = allProducts.filter( elem => elem.id != product.id ) // Saco el elemento

            const changed = {
                id: id,
                ...product,
                ...campo, 
            }

            filtrado.push(changed)       
            await this.writeFile(filtrado)

            return changed
        } catch (err) {
            console.log(err)
        }
    }
};


class Product {
    constructor(title, price, thumbnailURL, stock, code) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnailURL;
        this.stock = stock;
        this.code = code;
    }
};



export { Product, ProductManager };

