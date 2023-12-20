const form = document.getElementById('registerForm');


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form)
    const usuario = {}
    
    data.forEach((value,key) => {
        usuario[key] = value;
    })
    console.log(usuario, data)
    fetch("/api/sessions/register", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: { 
            "Content-type": "application/json"
        }
    }).then(result=>{
        if(result.status == 200){
            window.location.replace("/users/login")
        }
    })
})