

import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import cartRouter from "../routes/cart.router.js";
import { default as productsRouter } from "../routes/products.router.js";
import { ProductManager } from "../src/productManager.js";
import { __dirname } from "./utils.js";


let prodManPath = "/products.json"

let manager = new ProductManager(prodManPath)

function getProdsFromPath(path){
    return manager.getProducts()
}

let PORT = 8080

const app = express()


// Middleware para el req.query
app.use(express.static('public', { 
    extensions: ['html', 'js'], // Specify the file extensions to serve
    mimeTypes: {
      'html': 'text/html',
      'js': 'text/javascript', // Make sure to include the correct MIME type for JS files
    },
}));
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/../views")
app.set("view engine", "handlebars")

app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)


app.get("/", async (req,res)=> {
    let prodList = await getProdsFromPath(prodManPath);
    console.log(prodList)

    res.render("home",  {
        pList: prodList,
    } )
})


app.get("/realTimeProducts", (req, res) => {

    res.render("realTimeProducts", {})
})

const httpServer = app.listen(PORT, ()=> {
    console.log("connected to port", PORT)
})

const socketServer = new Server(httpServer)

socketServer.on("connection", async (socket) => {
    console.log("nuevo cliente conectado")
    
})


 
socketServer.on("connection", async (value)=>{
    console.log("query prods")
    socketServer.emit("reloadProd", await manager.getProducts());
})



export { manager, prodManPath, socketServer };

