import dotenv from "dotenv";
import program from "../process.js";

program
    .option('-d', 'Variable para debug', false)
    .option('--persist <mode>', 'Modo de persistencia', "mongodb")
    .option('--mode <mode>', 'Modo de trabajo', 'dev')
program.parse();

const enviroment = program.opts().mode

dotenv.config({
    path: enviroment === 'production' ? 
    "src/config/.env.production" : "src/config/.env.development"
})

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};