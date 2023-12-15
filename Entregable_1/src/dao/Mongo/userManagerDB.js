// Este fue elaborado a final de cursada
// ese es el motivo por el que no fue usado en cada lugar
// Cometi el error previamente de armar todo usando el modelo directamente
// Para el proyecto final, eso lo arregle
//import { userModel } from "./models/user.model.js";

import { userModel } from "./models/user.model.js";


class userManager {
    async getAllUsers() {
        try{
            let users = await userModel.find()
            return users
        } catch(e){
            Logger.error("UserManager" + e.message);
        }
    }

    async updateUsers(user){
        try{
            await userModel.updateOne({ _id: user._id }, { $set: user })
        } catch(e){
            Logger.error("updateUsers " + e.message);
        }
    }

    async changeUserRole(user, role){
        try{
            
            if(role == "admin" || role == "normal" || role == "premium"){ 
                let users = await userModel.updateOne({ _id: user._id }, { $set: { role: role }})
            } else {
                throw new Error("Invalid role")
            }

        } catch(e){
            Logger.error("changeUserRole " + e.message);
        }
    }
}


export { userManager };
