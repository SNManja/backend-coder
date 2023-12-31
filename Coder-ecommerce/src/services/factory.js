
import config from "../config/config.js";
import MongoSingleton from '../config/mongoSingleton.js';

let productService;
let cartService;
let ticketService;
let restoreService;
let userService;

async function initializeMongoService() {
    console.log("Iniciando servicio para MongoDB");
    try {
        // conectamos Mongo

        let instanceSingleton = await MongoSingleton.getInstance()

        instanceSingleton.isConnected();
        
        const { CartManagerDB } = await import('../dao/Mongo/cartsManagerDB.js');
        cartService = new CartManagerDB();
        console.log("Servicio de carts cargado");

        const { ProductManagerDB } = await import('../dao/Mongo/productManagerDB.js');
        productService = new ProductManagerDB();
        console.log("Servicio de productos cargado");

        const { ticketManager } = await import('../dao/Mongo/ticketManagerDB.js');
        ticketService = new ticketManager();
        console.log("Servicio de tickets");

        const { restoreManager } = await import('../dao/Mongo/restoreManagerDB.js');
        restoreService = new restoreManager();
        console.log("Servicio de restore");

        const { userManager } = await import("../dao/Mongo/userManagerDB.js");
        userService = new userManager();
        console.log("Servicio de usuarios");
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}

async function initializeFileSystem(){
    try{
        const {  CartManager } = await import('../dao/Filesystem/cartManager.js');
        cartService = new CartManager();
        console.log("Servicio de carts cargado:");
        console.log(cartService);

        const {  ProductManager } = await import('../dao/Filesystem/productManager.js');
        productService = new ProductManager();
        console.log("Servicio de productos cargado:");
        console.log(productService);


    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}

switch (config.persistence) {
    case 'mongodb':
        initializeMongoService();
        break;

    case 'files':
        initializeFileSystem();
        break;
        
    default:
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1); // Salir con código de error
}

export { cartService, productService, restoreService, ticketService, userService };

