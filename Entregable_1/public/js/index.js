// Config socket lado cliente
productDiv = document.getElementById("product-div");
const socket = io();


socket.on("reloadProd", (prodList)=> {
    console.log("prodList", prodList)
    reloadDOMList(prodList)
})

function reloadDOMList(prodList){
    while(productDiv.firstChild){
        productDiv.removeChild(productDiv.firstChild)
    }

    prodList.forEach((prod)=>{
        let thisProdDiv = document.createElement("div");
        

        let title = document.createElement("h2")
        title.textContent = prod.title
        let desc = document.createElement("p")
        desc.textContent = prod.desc
        let price = document.createElement("p")
        price.textContent = prod.price
        let status = document.createElement("p")
        status.textContent = prod.status
        let stock = document.createElement("p")
        stock.textContent = prod.stock
        let code = document.createElement("p")
        code.textContent = prod.code
        let category = document.createElement("p")
        category.textContent = prod.category

        thisProdDiv.appendChild(title)
        thisProdDiv.appendChild(desc)
        thisProdDiv.appendChild(price)
        thisProdDiv.appendChild(status)
        thisProdDiv.appendChild(stock)
        thisProdDiv.appendChild(code)
        thisProdDiv.appendChild(category)

        productDiv.appendChild(thisProdDiv)
    })
}