
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { ProductManager } from "./dao/Filesystem/productManager.js";
import ProductManagerDB from "./dao/Mongo/productManagerDB.js";
import cartRouter from "./routes/cart.router.js";
import { default as productsRouter } from "./routes/products.router.js";
import { __dirname } from "./utils.js";


let prodManPath = "/products.json"



let manager = new ProductManagerDB()
let maneager = new ProductManager(prodManPath)


let PORT = 8080

const app = express()



// Middleware para el req.query
app.use("/public", express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")



app.get("/", async (req,res)=> {
    let OGprodList = await manager.getProducts()
    
    let prodList = []


    // Esto es horrendo, pero fue la unica solucion a un conflicto con handlebars que encontre. No me permitia pasar directamente los valores que llegaban de la database por un tema de seguridad
    OGprodList.forEach((prod) =>{
        let newProd = {}
        newProd.title = prod.title
        newProd.desc= prod.desc
        newProd.price = prod.price
        newProd.status = prod.status
        newProd.stock = prod.stock
        newProd.code = prod.code
        prodList.push(newProd)
    })


    console.log(prodList)
    res.render("home",  {prodList} )
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
    let products = await manager.getProducts()

 
    socketServer.emit("reloadProd",  products );
})


const initialDBConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://santiagomanjarin111:hola12345@backendcoder.13dqh4u.mongodb.net/")

        console.log("db connected")
    } catch ( err ) {
        console.log( err )
    }
}

initialDBConnection()


app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)

export { manager, prodManPath, socketServer };

