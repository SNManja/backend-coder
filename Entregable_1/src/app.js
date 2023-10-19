

import express from "express";
import handlebars from "express-handlebars";
import * as productController from "./controller/product.controller.js";
import cartRouter from "./routes/cart.router.js";
import githubLoginViewsRouter from "./routes/github-login.views.router.js";
import mainPageRouter from "./routes/main.router.js";
import { default as productsRouter } from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import userViewsRouter from "./routes/user.views.router.js";
import { __dirname } from "./utils.js";

import { Server } from "socket.io";
import config from "./config/config.js";


const app = express()

/*
Tendria que pasar el app al factory y de ahi cargarlo no?

import MongoStore from "connect-mongo";
import session from "express-session";

//Config Sessions. Esto tendria que ir en el factory no? !!!!!!!!!!!!!!!!
let MONGO_URL = config.MONGO_URL
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10 * 60 // 10 minutes
    }),
    secret: "bingchilling",
    resave: false, //guarda en memoria
    saveUninitialized: true, //lo guarda a penas se crea
}))



//Passport middleware
initPassport();
app.use(passport.initialize());
app.use(passport.session());
*/
// Middleware para el req.query
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Config handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")


// Routes
app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)
app.use("/api/sessions",sessionsRouter)
app.use("/users",userViewsRouter); 
app.use("/github",githubLoginViewsRouter); 
app.use("/", mainPageRouter)


const PORT = config.PORT
const httpServer = app.listen(PORT, ()=> {
    console.log("connected to port", PORT)

})


const socketServer = new Server(httpServer)

socketServer.on("connection", async (socket) => {
    console.log("nuevo cliente conectado")  
})

socketServer.on("connection", async (value)=>{
    console.log("query prods")
    let products = await productController.getProducts() 
    socketServer.emit("reloadProd",  products );
})


export { socketServer };

