import chai from "chai";
import supertest from 'supertest';
import { userModel } from "../src/dao/Mongo/models/user.model.js";


const expect = chai.expect;

const requester = supertest('http://localhost:8080')

let deleteMailAfter = false;
let usuario = {
    first_name: "test",
    last_name: "user",
    age: 21,
    email: "testingMockUser@gmail.com",
    password: "eeee",
    //cart: []
}

describe("Register endpoint genera usuario", ()=>{

    it("Creacion de usuario", async ()=>{
        const {status, body} = await requester.post('/api/sessions/register').send(usuario)
        expect(status).is.eqls(200)
    })


    after( async ()=>{
       await userModel.findOneAndDelete(usuario)
    })
})