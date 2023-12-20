const usersDiv = document.getElementById("user-container");

document.getElementById("home-button").addEventListener("click", (e)=>{
    window.location.replace("/")
});

document.getElementById("mock-button").addEventListener("click", (e)=>{
  window.location.replace("/mock")
});

document.getElementById("del-unused-button").addEventListener("click", (e)=>{
    fetch("/api/admin/deleteUnusedUsers", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then(result => {
      if (result.status === 200) {
      } else {
        console.error("Error deleting users:");
      }
      return; 
    })
})

getUsers()

async function getUsers() {
    let users;
    fetch("/api/admin/getAllUsers", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then(result => {
      if (result.status === 200) {
        return result.json(); 
      } else {
        console.error("Error fetching users:", result.statusText);
        return;
      }
    }).then(parsedData => {
      console.log("Users:", parsedData)
      loadDOM(parsedData.users)
    }).catch(error => {
      console.error("Error fetching users:", error);
    });
    return users;
}

async function loadDOM(users){
    console.log("LoadDOM", users)
    for (const user of users) {
        let userDiv = document.createElement("div");
        userDiv.className = "user-div";

        let userID = document.createElement("p");
        let firstName = document.createElement("p");
        let lastName = document.createElement("p");
        let email = document.createElement("p");
        let role = document.createElement("p");
        let delButton = document.createElement("button");
        let upgradeButton = document.createElement("button");

        userID.className = "user-id";
        firstName.className = "first-name";
        lastName.className = "last-name";
        email.className = "email";
        role.className = "role";
        delButton.className = "del-button";
        upgradeButton.className = "edit-button";

        userID.textContent = user._id;
        firstName.textContent = user.first_name;
        lastName.textContent = user.last_name;
        email.textContent = user.email;
        role.textContent = user.role;
        delButton.textContent = "X";
        upgradeButton.textContent = "Upgrade";

        delButton.addEventListener("click", deleteUser)
        upgradeButton.addEventListener("click", upgradeUser)

        userDiv.appendChild(userID);
        userDiv.appendChild(firstName);
        userDiv.appendChild(lastName);
        userDiv.appendChild(email);
        userDiv.appendChild(role);
        userDiv.appendChild(delButton);
        userDiv.appendChild(upgradeButton);

        usersDiv.appendChild(userDiv);
    }
}

async function deleteUser(e){
  const userId = e.target.closest(".user-div").querySelector(".user-id").textContent;
  fetch(`/api/admin/deleteUser/${userId}`,{
      method: "DELETE",
      headers:{ 
          "Content-type": "application/json",
      }
  }).then(result=>{
      if(result.status == 200){
          location.reload()
      }
  }).catch(error=>{
    console.error(error)
  })
  
}


async function upgradeUser(e){
  const userId = e.target.closest(".user-div").querySelector(".user-id").textContent;
  fetch(`/api/admin/upgradeUser/${userId}`,{
      method: "POST",
      headers:{ 
          "Content-type": "application/json",
      }
  }).then(result=>{
    if(result.status == 200){
        location.reload()
    }
  }).catch(error=>{
    console.error(error)
  })

}




