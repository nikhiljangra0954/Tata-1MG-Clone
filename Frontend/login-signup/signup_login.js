  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  const baseurl = `http://localhost:8088`
  const userurl = `${baseurl}/users`
  const signupurl = `${userurl}/register`
  const loginurl = `${userurl}/login`

  async function sinup(){
    checkvalues();
  }
  const checkvalues =()=>{
   
  }
  const login_btn = document.getElementById("login")

  const signup = document.getElementById("signup")
  signup.addEventListener("click", (e) => {
    e.preventDefault()
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let obj = {
      name: name,
      email: email,
      password: password
    }
    console.log(obj)
    postuser(obj)
    
  })

  const postuser = async (obj)=>{
    try {
      const res = await fetch(signupurl,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      console.log(res)
      if(res.ok){
        alert("sign_up successfully")
      }else{
        alert("Not registered")
      }
    } catch (error) {
      console.log("error while posting data")
    }
  }

  login_btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let loginemail = document.getElementById("loginemail").value
    let loginpassword = document.getElementById("loginpassword").value

    let loginobj={
      email: loginemail,
      password: loginpassword
    }

    console.log(loginobj)
    loginuser(loginobj)
  })

  const loginuser = async (obj)=>{
   try {
    let res = await fetch(loginurl,{
      method: "POST",
      body: JSON.stringify(obj),
      headers:{
        "Content-Type": "application/json",
      },
    })
    console.log(res)
    if(res.ok){
      let token = await res.json()
      console.log(token)
      localStorage.setItem("accessToken",token.token)
      if(token.token){
        window.location.href="../index.html"
      }else{
        alert("wrong Password")
      }
    }else{
      alert("Wrong Password")
    }
   } catch (error) {
    console.log(error)
   }

  }