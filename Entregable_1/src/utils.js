import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, `${__dirname}/../public/img`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    } 
})

export const uploader = multer({storage})
