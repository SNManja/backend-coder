import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Multer

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, `${__dirname}/public/img`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    } 
})

export const uploader = multer({storage})

// bcrypt
const PRIVATE_KEY = "porfavorfunciona"


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

// JWT 
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
};

export const authToken = (req, res, next) =>{
    const token = req.headers.cookie.split(';')[0].split("=")[1];
  
    if(!token) return res.status(401).send({ error: "Not authenticated" })
    
    jwt.verify(token, PRIVATE_KEY, (error, credentials) =>{
        if(error) return res.status(403).send({error: "Not authorized"})
        req.user = credentials.user
        next();
    })
}

export async function getUserCart(cartID){
    let carrito
    try {
        let response = await fetch(`http://localhost:8080/api/cart/${cartID}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            carrito = data.carrito;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch(err){
        throw err;
    }
    return carrito;
}

