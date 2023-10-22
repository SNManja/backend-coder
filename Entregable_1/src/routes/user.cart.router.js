import { Router } from "express";
import { checkoutTicket } from "../controller/ticket.controller.js";
import { authToken, getUserCart } from "../utils.js";
const router = Router()


router.get("/", authToken ,async (req, res) =>{
    let carrito = await getUserCart(req.user.cart)
    
    res.render("cartPreview", {
        user:req.user, cart: carrito
    })
})
router.post("/add/:pid", authToken, async (req, res) =>{
    try{
        let pid = req.params.pid
        let cid = req.user.cart
        
        fetch(`http://localhost:8080/api/cart/${cid}/product/${pid}`,{
            method: "POST",
            body: "",
            headers:{ 
                "Content-type": "application/json",
            }
        }).then(result=>{
            if(result.status == 200){
                console.log(`Product ${req.params.pid} added to user cart`)
                res.send(`Product ${req.params.pid} added to user cart`)
            } else {
                console.log(result.status, "Couldn't add product")
            }
        })
    } catch(err){
        console.error("Cant get user cart")
        res.status(404);
    }
})

router.get("/checkout", authToken, checkoutTicket ,async (req, res) => {
    let checkout =  req.ticket
    
    let user = req.user
    
    console.log(`Checkout${checkout}`)

    res.render("checkout", { // Carrito esta dentro de req.user, el checkout hay q calcularlo
        checkout: checkout, user: user
    })
    
})


export default router;