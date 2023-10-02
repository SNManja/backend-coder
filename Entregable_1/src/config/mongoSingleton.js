import mongoose from "mongoose";
import config from "./config.js";


export default class MongoSingleton {
    static #instance;

    constructor(){
        this.#connectToMongo();
    }


    static getInstance() {
        if (this.#instance) {
            console.log("Already connected to Mongo");
        } else {
            this.#instance = new MongoSingleton();
        }
    }

    #connectToMongo() {
        async () => {
            try {
                await mongoose.connect(config.MONGO_URL)
                console.log("db connected")
            } catch ( err ) {
                console.log( err )
                process.exit();
            }
        }
    }

}