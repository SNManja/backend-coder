//document.querySelectorAll(".delButton").addEventListener("click", delProd)
const cart_ID = document.getElementById("cart-id").textContent
const user_ID = document.getElementById("user-id").textContent

let logoutButton = document.getElementById("logout-button");
let productsButton = document.getElementById("products-button");
let checkoutButton = document.getElementById("checkout-button");

logoutButton.addEventListener("click", (e)=>{
    fetch("/api/sessions/logout",{
        method: "DELETE",
        body: "",
        headers:{ 
            "Content-type": "application/json",
        }
    }).then(result=>{
        if(result.status == 200){
            window.location.replace("/users/login")
        }
    })
})
productsButton.addEventListener("click", (e)=>{
    window.location.replace("/products")
})

checkoutButton.addEventListener("click",(e)=>{
    fetch(`/users/cart/ticket/create/${user_ID}/${cart_ID}`,{
        method: "POST",
        headers:{ 
            "Content-type": "application/json",
        }
    }).then(result=>{
        if(result.status == 200){
            return result.json();
        } else {
            throw new Error("POST request failed")
        }
        
    }).then(resultJSON =>{
        const ticket_ID = resultJSON._id;
        
        if(ticket_ID){
            window.location.replace(`/users/cart/checkout/${ticket_ID}`)
        } else {
            throw new Error("Couldn't find ticket ID")
        }
    }).catch(error =>{
        console.error(error.message)
    })
    
})

function getIds() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delButton")) {
            const productInCart = event.target.closest(".product-in-cart");
            if (productInCart) {
                const prod_ID = productInCart.querySelector(".prod-id").textContent;
                fetchDelProd(prod_ID,  cart_ID)
            }
        }
    });
}
getIds();

function fetchDelProd(prod_ID, cart_ID) {
    fetch(`/api/cart/${cart_ID}/products/${prod_ID}`, {
        method: "DELETE",
        headers: { 
            "Content-type": "application/json"
        }
    }).then(result=>{
        if (result.status === 200) {
                window.location.reload();
        } else if (result.status === 401) {
            console.log(result);
            alert("No se ha podido eliminar el producto.");
        }
        
           
    })
}

function fetchTicket(){

}