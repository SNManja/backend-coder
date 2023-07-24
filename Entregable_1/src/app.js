

import express from "express";
import cartRouter from "../routes/cart.router.js";
import productsRouter from "../routes/products.router.js";


let PORT = 8080

const app = express()


// Middleware para el req.query
app.use("/static",express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)


app.listen(PORT, ()=> {
    console.log("connected to port", PORT)
})