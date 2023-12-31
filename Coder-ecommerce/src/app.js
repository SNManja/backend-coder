

import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { Server } from "socket.io";
import swaggerUIExpress from "swagger-ui-express";
import config from "./config/config.js";
import { swaggerSpecs } from "./config/documentation.config.js";
import { addLogger } from "./config/logger.js";
import initPassport from './config/passport.config.js';
import adminRouter from "./routes/admin.router.js";
import adminViewsRouter from "./routes/admin.views.router.js";
import cartRouter from "./routes/cart.router.js";
import githubLoginViewsRouter from "./routes/github-login.views.router.js";
import mailingRouter from "./routes/mailing.router.js";
import mainPageRouter from "./routes/main.router.js";
import { default as productsRouter } from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import userCartRouter from "./routes/user.cart.router.js";
import userViewsRouter from "./routes/user.views.router.js";
import { productService } from './services/factory.js';
import { __dirname } from "./utils.js";


const app = express()


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

// Middleware para el req.query
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(addLogger)

// Config swagger
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerSpecs))

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
app.use("/users/cart/", userCartRouter)
app.use("/api/mailing", mailingRouter)
app.use("/admin", adminViewsRouter)
app.use("/api/admin", adminRouter)


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
    try {
        let products = await productService.getProducts() 
        socketServer.emit("reloadProd",  products );
    } catch(err){
        console.error("socket error")
    }
    
})


export { socketServer };

