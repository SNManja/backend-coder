const form = document.getElementById('loginForm');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form)
    const usuario = {}
    data.forEach((value, key) => {
        usuario[key] = value;
    })
    fetch("/api/sessions/login", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: { 
            "Content-type": "application/json"
        }
    }).then(result=>{
        if(result.status == 200){
            window.location.replace("/realTimeProducts")
        }
    })
})