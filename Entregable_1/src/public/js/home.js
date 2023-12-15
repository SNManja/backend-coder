let productsButton = document.getElementById('products-button');
let logoutButton = document.getElementById("logout-button");
let profileButton = document.getElementById("profile-button");
let cartButton = document.getElementById("cart-button");

cartButton.addEventListener("click", (e)=>{
    window.location.replace("/users/cart") // replace
})

profileButton.addEventListener("click", (e)=>{
    window.location.replace("/users/")
})

productsButton.addEventListener("click", (e)=>{
    window.location.replace("/products")
})

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