
import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import config from "./config/config.js";
import MongoSingleton from "./config/mongoSingleton.js";
import initPassport from './config/passport.config.js';
import { ProductManager } from "./dao/Filesystem/productManager.js";
import ProductManagerDB from "./dao/Mongo/productManagerDB.js";
import cartRouter from "./routes/cart.router.js";
import githubLoginViewsRouter from "./routes/github-login.views.router.js";
import mainPageRouter from "./routes/main.router.js";
import { default as productsRouter } from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import userViewsRouter from "./routes/user.views.router.js";
import { __dirname } from "./utils.js";


let prodManPath = "/products.json"

let manager = new ProductManagerDB()
let maneager = new ProductManager(prodManPath)



let MONGO_URL = config.MONGO_URL

const app = express()

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



app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")



const initialDBConnection = MongoSingleton.getInstance()






app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)
app.use("/api/sessions",sessionsRouter)
app.use("/users",userViewsRouter); 
app.use("/github",githubLoginViewsRouter); 
app.use("/", mainPageRouter)


export { manager, prodManPath };

