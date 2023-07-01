function tuMama () {
    let i = 0 
    let j = true
    if (j) {
        let i = 3
        let k = "tu mama"
        console.log(i) // 3
        console.log(k) // tu mama
    }
    console.log(i) // 0
    console.log(k) // error
    return i
}

function listaVacia(l){
    for (let i in l) {
        console.log(l[i])
    }
    console.log("lista Vacia")
    return `tamano lista ${l.length}`
}
console.log(listaVacia([2,3,45,6,]))