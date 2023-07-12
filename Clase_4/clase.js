

function generadorCobble(lng){
    let obj = {}
    for (let i = 0; i < lng; i++){
        let num = Math.floor(Math.random() * 21)
        console.log(num)
        if(obj[num]){
            obj[num] += 1;
        } else{
            obj[num] = 1
        }
    }

    return obj
}

console.log(generadorCobble(1000))