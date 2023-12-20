import winston from "winston";
import config from "./config.js";

const custom = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors: {
        fatal:"red",
        error: "orange",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "white",
    }
}

const devLogger = winston.createLogger({
    level: custom.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({
                    colors: custom.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "./dev-errors.log",
            level: "debug",
            format: winston.format.simple()
        })
    ]
})

const prodLogger = winston.createLogger({
    level: custom.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({
                    colors: custom.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "info",
            format: winston.format.simple()
        })
    ]
})

// armamos el middleware
export const addLogger = (req,res,next) => {
    req.logger = config.enviroment == "dev" ? devLogger : prodLogger;    
    
    req.logger.http(`${req.method} end ${req.url} - at ${new Date().toLocaleDateString()}`)
    
    next()
}