const form = document.getElementById('restoreForm');


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form)
    const usuario = { email: data.email }
    

    data.forEach((value,key) => {
        console.log(value, key)
        usuario[key] = value;
    })
    console.log(usuario)
    
    fetch("/api/sessions/restorePassword", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: { 
            "Content-type": "application/json"
        }
    }).then(result=>{
        if(result.status == 200){
            form.style.backgroundColor = '#008000'
        } else {
            form.style.backgroundColor = '#800000'
        }
    })
})