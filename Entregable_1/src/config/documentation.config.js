import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "E-Commerce documentation",
            description: ""
        }
    },
    apis: [`./src/docs/**/*.yaml`]
};


const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export { swaggerSpecs };

