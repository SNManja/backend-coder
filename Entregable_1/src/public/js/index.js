

productsDiv = document.getElementById("product-div");
const socket = io();

let logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", (e)=>{
    fetch("/api/sessions/logout",{
        method: "DELETE",
        body: "",
        headers:{ 
            "Content-type": "application/json"
        }
    }).then(result=>{
        if(result.satus == 200){
            window.location.replace("/users/login")
        }
    })
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
    prodList.forEach((prod)=>{
        let thisProdDiv = document.createElement("div");
        thisProdDiv.className = "product"

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
        let code = document.createElement("p")
        code.textContent ="Code: " + prod.code
        let category = document.createElement("p")
        category.textContent ="Category: " + prod.category

        thisProdDiv.appendChild(prodNum) //
        thisProdDiv.appendChild(title)
        thisProdDiv.appendChild(desc)
        thisProdDiv.appendChild(price)
        thisProdDiv.appendChild(status)
        thisProdDiv.appendChild(stock)
        thisProdDiv.appendChild(code)
        thisProdDiv.appendChild(category)

        productsDiv.appendChild(thisProdDiv)
        count++;
    })
}