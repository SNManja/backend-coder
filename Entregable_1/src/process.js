import { Command } from "commander";

const program = new Command();



program
    .option("-d", "variable para debug", false)
    .option('-p <port>', 'server port', 8080)
    .option('--mode <mode>', 'working env', 'develop')
    .option('-u <user>', 'Usuario que va utilizar la app', "user not declared")
program.parse();

export default program;