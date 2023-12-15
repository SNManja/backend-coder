

productsDiv = document.getElementById("product-div");
const socket = io();

let logoutButton = document.getElementById("logout-button");
let cartButton = document.getElementById("cart-button");


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
cartButton.addEventListener("click", (e)=>{
    window.location.replace("/users/cart")
})


socket.on("reloadProd", (prodList)=> {
    console.log("prodList", prodList)
    reloadDOMList(prodList)
})

function reloadDOMList(prodList){
    while(productsDiv.firstChild){
        productsDiv.removeChild(productsDiv.firstChild)
    }
    let count = 1
    prodList.forEach(async (prod)=>{
        let thisProdDiv = document.createElement("div");
        thisProdDiv.className = "product"

        console.log(prod)
        let prodNum = document.createElement("p")
        prodNum.className = "prodNum";
        prodNum.textContent = count
        let title = document.createElement("h2")
        title.textContent = prod.title
        let desc = document.createElement("p")
        desc.textContent = "Desc: " +prod.desc
        let price = document.createElement("p")
        price.textContent = "Price: " +prod.price
        let status = document.createElement("p")
        status.textContent = "Status: " + prod.status
        let stock = document.createElement("p")
        stock.textContent ="Stock: " + prod.stock
        let id = document.createElement("p")
        id.classList.add("prod_ID")
        id.textContent ="id: " + prod._id
        let category = document.createElement("p")
        category.textContent ="Category: " + prod.category
        let addButton = document.createElement("button")
        addButton.textContent = "+"

        thisProdDiv.appendChild(prodNum) //
        thisProdDiv.appendChild(title)
        thisProdDiv.appendChild(desc)
        thisProdDiv.appendChild(price)
        thisProdDiv.appendChild(status)
        thisProdDiv.appendChild(stock)
        thisProdDiv.appendChild(id)
        thisProdDiv.appendChild(category)
        addButton.addEventListener("click", fetchAddToCart)
        thisProdDiv.appendChild(addButton)

        productsDiv.appendChild(thisProdDiv)
        count++;
    })
}

async function fetchAddToCart(event){
    const productContainer = event.target.parentElement;
    const prod_ID = productContainer.querySelector(".prod_ID").textContent.split(" ")[1]
    console.log("this is the id", prod_ID)
    try {
        await fetch(`users/cart/add/${prod_ID}/`,{
            method: "POST",
            body: "",
            headers:{ 
                "Content-type": "application/json",
            }
        }).then(result=>{
            if(result.status == 200){
                console.log(`Product ${prod_ID} query sent`)
            }
        })
    } catch (err){
        console.error(`Error sending ${prod_ID} query`)
        
    }
    
}

