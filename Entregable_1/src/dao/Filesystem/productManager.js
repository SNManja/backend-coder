
import fs from "fs";


class ProductManager {
    #path

    static id = 0;
    constructor(fileName) {
        this.products = [];
        this.#path =   "./src/dao/Filesystem/storage/productLists" + fileName;
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
            console.log("this will be written:",productList);
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

    async getID() {
        // No checkeo en el archivo porque esto lo uso solo cuando agrego un productos y eso actualiza antes this.products
        while (await this.getProductById(ProductManager.id, this.products) !== "Not found"){
            ProductManager.id++;
        }
        return ProductManager.id;
    }

    async addProduct(product) {
        try{
            if (product instanceof Product){

                await this.getProducts()
                let id = await this.getID()
                this.products.push({...product, id});

                await this.writeFile(this.products);

                

            } else {
                console.log("not a product")
            }
        } catch (e) { 
            console.log("error:", e)
            return 
        }
    }

    async getProductById(id) {
        
        let productList;
        await this.getProducts()
        productList = await this.getProducts();

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

            if ( product == "Not found") {
                throw new Error('Product not found');
            }

            const filtrado = allProducts.filter( elem => elem.id != product.id ) // Saco el elemento

            const changed = {
                ...product,
                ...campo, 
                id: id 
            }

            filtrado.push(changed)       
            await this.writeFile(filtrado)
            
            return changed
        } catch (err) {
            console.error(err)
        }
    }
};


class Product {
    
    constructor(title, desc, code, price, stock, category, thumbnails) {
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.status = true;
        this.stock = stock;
        this.code = code;
        this.category = category;
        this.thumbnails = this.#initThumb(thumbnails)
    }

    #initThumb(tn) {
        return tn
        // Esto lo hice para almacenar solo la direccion de almanamiento. Es mejor esto o el objeto completo con toda la data?
        // Puedo directamente devolver tn si eso es valido
        /*
        let thumblist = []

        tn.forEach((e)=>{
            thumblist.push(e.path)
        })
        return thumblist
        */
    }
};



export { Product, ProductManager };

