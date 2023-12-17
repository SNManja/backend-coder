// Este fue elaborado a final de cursada
// ese es el motivo por el que no fue usado en cada lugar
// Cometi el error previamente de armar todo usando el modelo directamente
// Para el proyecto final, eso lo arregle
//import { userModel } from "./models/user.model.js";

import { userModel } from "./models/user.model.js";


class userManager {
    async findUserByMail(username){
        try{
            const user = await userModel.findOne({ email: username });
            return user;
        } catch (e) {
            console.error("UserManager FindUserByMail, " + e.message)
        }
    }

    async getAllUsers(searchParams = null) {
        try{
            let users
            if (searchParams == null) {
                users = await userModel.find()
            } else {
                users = await userModel.find(searchParams)
            }

            return users
        } catch(e){
            Logger.error("UserManager getAllUsers" + e.message);
        }
    }

    async updateUser(user){
        try{
            await userModel.updateOne({ _id: user._id }, { $set: user })
        } catch(e){
            Logger.error("UserManager updateUsers " + e.message);
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
            Logger.error("UserManager changeUserRole " + e.message);
        }
    }

    async deleteUnusedUsers(){
        const thresholdDate = new Date(Date.now() - 60 * 60 * 24); // Mas de una hora
        const inactiveUsers = await userModel.find({ last_login: { $lt: thresholdDate } });
        await userModel.deleteMany({ _id: { $in: inactiveUsers.map(user => user._id) } });
    }   

    async updateLogin(user) {
        try{
            
            const modifiedUser = await userModel.findByIdAndUpdate(user._id, {
                $set: {
                    last_login: new Date(),
                }
            },{
                new: true,
            });

            return modifiedUser
        } catch (e) {
            console.error("updateLogin " + e.message)
        }
        
    }
}


export { userManager };

