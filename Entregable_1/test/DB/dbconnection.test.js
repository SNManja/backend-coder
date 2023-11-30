import chai from "chai";
import mongoose from "mongoose";
import { userModel } from "../../src/dao/Mongo/models/user.model.js";

const MONGO_URL = "mongodb+srv://santiagomanjarin111:WoU9DelakFw8w4Z2@ecommerce.9wfuip9.mongodb.net/"

const expect = chai.expect;

let deleteMailAfter = false;

describe("Conexion DB", ()=> {
    before(async ()=>{
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    })

    it("Checkear que la conexion funcione tomando un usuario", async () => {
        let user = await userModel.find({email:"santiagomanjarin111@gmail.com"})

        if(!user || user.length == 0){
            deleteMailAfter = true;
            user = await userModel.create(            user = await userModel.create({
                first_name: "Santiago",
                last_name: "M.",
                age: 21,
                email: "santiagomanjarin111@gmail.com",
                password: "eeee",
                //cart: []
            }))
        }
        expect(user).to.be.ok
    })

    after(()=>{
        if(deleteMailAfter) { // En caso de que antes no existiera el usuario lo elimina
            userModel.findOneAndDelete({ email: "santiagomanjarin111@gmail.com"})
        }
        mongoose.connection.close()
    })
})