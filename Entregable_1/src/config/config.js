import { Command } from "commander";
import dotenv from "dotenv";


const program = new Command();


program
    .option('-d', 'Variable para debug', false)
    .option('-p <PORT>', 'server port', 8080)
    .option('--persist <MODE>', 'Modo de persistencia', "mongodb")    
program.parse();



const enviroment = program.opts().mode

console.log("Environment Mode Option: ", program.opts().mode);
console.log("Persistence Mode Option: ", program.opts().persist);

dotenv.config({
    path: enviroment === 'production' ? 
    "src/config/.env.production" : "src/config/.env.development"
})


export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    persistence: program.opts().persist,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};