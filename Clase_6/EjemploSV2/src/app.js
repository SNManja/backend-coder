import express from "express";

const app = express();
const PORT = 8080;


const user = {
    name: 'Juan',
    age: 30,
    address: {
        city: 'New York',
        state: 'NY'
    }
};

app.get("/bienvenido",(req,res)=>{
    res.send("<p style='color: blue'>Bienvenida!!!!</p>")
})

app.get("/user", (req,res)=>{
    res.send(user)
})

app.listen(PORT, ()=>{
    console.log("listening on port " +PORT);
});