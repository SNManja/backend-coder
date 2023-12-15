
import { userService } from '../services/factory.js';

export async function getAllUsers(req, res){
    try{
        let users = await userService.getAllUsers();
    } catch(e){
        console.error(err)
    }
}