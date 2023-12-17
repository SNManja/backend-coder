
import { userService } from '../services/factory.js';


export async function getAllUsers(req, res){
    try{
        let users = await userService.getAllUsers();
        res.send({ users: users })
    } catch(e){
        console.error(err)
        res.status(400).send("getAllUsers ",e.message)
    }
}

export async function updateUser(req, res) {
    try {
        let user = req.body.user; 
        await userService.modifyUser(user)
    } catch(e) {
        console.error("modifyUser", e.message)
        res.status(400).send(err)
    }
}

export async function deleteUser(req, res) {
    try {
        await userService.deleteUser(req.params.uid)
        res.send(200)
    } catch(e) {
        console.error("deleteUser", e.message)
        res.status(400).send(err)
    }
}

export async function upgradeUser(req, res) {
    try {
        await userService.changeUserRole(req.params.uid, "admin")
    } catch (e) {
        console.error("upgradeUser", e.message)
        res.status(400).send(err)
    }
}

export async function deleteUnusedUsers(req, res) {
    try {
        await userService.deleteUnusedUsers();
        res.send(200)
    } catch (e) {
        console.error(e)
        res.status(400).send("deleteUnusedUsers",e.message)
    }
}

    


