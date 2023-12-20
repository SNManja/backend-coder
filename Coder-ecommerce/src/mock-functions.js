import { faker } from "@faker-js/faker";



/*
            let newProd = {}
            newProd.title = prod.title
            newProd.desc= prod.desc
            newProd.price = prod.price
            newProd.status = prod.status
            newProd.stock = prod.stock
            newProd.code = prod.code
            prodList.push(newProd)
*/

export  function genMockProdList(){
    let prodList = []
    for (let i = 0 ; i < 30 ; i++) {
        prodList.push(genMockProd())
    }
    return prodList
}

function genMockProd(){
    let newProd = {}
    newProd.title = faker.commerce.product()
    newProd.desc = faker.commerce.productDescription()
    newProd.price = faker.commerce.price()
    newProd.status = true
    newProd.stock = faker.number.int(50)
    newProd.code = faker.string.alpha(3) + faker.number.int(100,999)  
        
    return newProd
}