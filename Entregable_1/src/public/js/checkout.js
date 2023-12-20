const ticket_ID = window.location.pathname.split("/")[4];

const homeButton = document.querySelector("button")

homeButton.addEventListener("click", (e) => {
    window.location.replace("/")
})

const user = document.getElementById("user");
const code = document.getElementById("code");
const amount = document.getElementById("amount");

code.textContent = ticket_ID;

function getTicket() {
    let response = fetch(`/users/cart/ticket/find/${ticket_ID}`,{
        method: "GET",
        headers:{ 
            "Content-type": "application/json",
        }
    }).then((res) => res.json())
        .then((resParsed) => {
            amount.textContent = resParsed.amount;
            user.textContent = resParsed.purchaser;
        })
    return response;
}

getTicket()

