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
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24hs"})
}

export const authToken = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({ error: "Not authenticated" })
    const token = authHeader.split(" ")[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials) =>{
        if(error) return res.status(403).send({error: "Not authorized"})
        req.user = credentials.user
        next();
    })
}