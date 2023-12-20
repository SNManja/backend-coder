import { restoreModel } from "./models/restore.model.js";


class restoreManager {

    async createRestore(email){
        try{
            const restore = {
                email: email,
                expiration: new Date(Date.now() + 360000)
            }  
            return await restoreModel.create(restore);
        } catch (err) {
            console.error("Error creating ticket", err)
        }
    }

    async checkRestore(id){
        try {
            let restoreTicket = await restoreModel.findById(id)
            return restoreTicket 
        } catch (err) {

            console.warn("Couldnt find restore ticket", err)
        }
        
    }

    async deleteRestore(id){
        try {
            await restoreModel.findByIdAndDelete(id)
            return
        } catch (err){
            console.warn("Couldn't delete restore ticket", err)
        }
    }
}

export { restoreManager };

