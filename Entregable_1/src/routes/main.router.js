import express, { Router } from "express";
import { Server } from "socket.io";
import { manager } from "../app.js";
import config from "../config/config.js";

const router = new Router()
const app = express();

const PORT = config.PORT

router.get("/", async (req,res)=> {
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


router.get("/realTimeProducts", (req, res) => {

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


export { socketServer };


export default router;
