const form = document.getElementById('restoreForm');


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form)
    const usuario = { password: data.password }
    
    const urlID = window.location.href.split('/users/restorePassword/')[1];
    console.log("urlID",urlID);
    data.forEach((value,key) => {
        console.log(value, key)
        usuario[key] = value;
    })
    console.log(usuario)
    // TENGO QUE VER COMO AGREGAR LA ID DESDE LA URL
    fetch(`/api/mailing/${urlID}`, {
        method: "PUT",
        body: JSON.stringify(usuario),
        headers: { 
            "Content-type": "application/json"
        }
    }).then(result=>{
        if(result.status == 200){
            form.style.backgroundColor = '#008000'
            window.location.replace("/users/login")
        } else {
            form.style.backgroundColor = '#800000'
        }
    })
})