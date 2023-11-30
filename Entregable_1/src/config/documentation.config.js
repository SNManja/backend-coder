import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "../utils";

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "E-Commerce documentation",
            description: ""
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};


const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export { swaggerSpecs };

