let form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(username=="admin" &&password=="admin"){
        alert("logged in successfully");
        window.location.href="adminpanel.html";
    }else{
        alert("wrong credentials");
    }

})