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
        if (result.status === 200) {
            result.json()
                .then(json => {
                    // 1er:localStorage - analizamos que nos llega al cliente
                    // console.log(json);
                    // localStorage.setItem('authToken', json.jwt)

                    // 2do:cookie
                    console.log("Cookies generadas:");
                    console.log(document.cookie);
                    window.location.replace("/realTimeProducts")
        
                })
        } else if (result.status === 401) {
            console.log(result);
            alert("Login invalido revisa tus credenciales!");
        }
        
           
    })
})