import nodemailer from 'nodemailer'
import config from "../config/config.js"
import { userModel } from "../dao/Mongo/models/user.model.js"
import { restoreService } from "../services/factory.js"
import { createHash } from "../utils.js"

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailPassword // fijarse principio clase
    }
})

// Antes de seguir adelante checkeamos que la conexion funcione correctamente

transport.verify(function (err, success){
    if(err){
        console.warn(err)
    } else {
        console.log("Ready to take msgs")
    }
})


// Objeto de config que tiene la estructura del msg!


export const sendEmail = async (req, res) => {
    try{
        let restoreTicket = await restoreService.createRestore(req.params.email)
        console.log("restoreID",restoreTicket._id)
        const mailOptions = {
            from: config.gmailAccount,
            to: req.params.email,
            subject: "Restaura tu contraseña",
            html: `<div>
                        <h1>Restaura to contraseña</h1>
                        <p>Link: </p>
                        <a href="http://localhost:8080/users/restorePassword/${restoreTicket._id}">Click this</a>
                    </div>`,
            attachments: []
        }
        
        if(mailOptions["to"] == undefined){
            throw new Error("Please specify an email address");
        }
       
        transport.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error)
                res.status(400).send({msg: "Error", payload: "error"})
            }
            res.send({message: "Success!", payload: info})
        })
    } catch (error){
        
        req.logger.warn(error),
        res.status(500).send({ error:error, message: "Mail counldt be sent"})
    }
}

export const restorePassword = async (req, res) => {
    let restoreID = req.params.id
    let password = req.body.password

    try{ 
        let restoreTicket = await restoreService.checkRestore(restoreID)
        if(!restoreTicket){
            throw new Error("Restore ticket do not exist")
        }
        let user = await userModel.findOne({ email: restoreTicket.email })
        if(!user){
            throw new Error("User do not exist")
        }
        const newPassword = await createHash(password)

        user.password = newPassword
        await user.save()
        await restoreService.deleteRestore(restoreID)


        res.send({message: "Success!" })
        
    } catch (error){
        
        req.logger.warn("Error: ",error)
        res.status(500).send({ error:error, message: "User could not be modified"})
    }
}

export async function restoreTokenChecker(req, res, next){
    let restoreTicket = await restoreService.checkRestore(req.params.id)
    if(!restoreTicket){
        res.status(401).send({ error: "Restore ticket does not exist" })
        return
    }
    if(restoreTicket.expiration < Date.now()){
        res.status(401).send({ error: "Ticket expired" })
        return
    }

    next()
}