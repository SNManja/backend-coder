import dotenv from "dotenv";
import program from "../process.js";

const enviroment = program.opts().mode

dotenv.config({
    path: enviroment === 'production' ? 
    "src/config/.env.production" : "src/config/.env.development"
})

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL
}