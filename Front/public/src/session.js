function validSession() {
    console.log("entre a valid session");
    const token = window.localStorage.getItem('token')
    
    if(token == null) {
      window.location.href = './login.html'
    }else {
      axios.get('http://localhost:3000/user', {
        'headers': {'auth':token}
      })
      .then(function (response){
          console.log("entre al log");
        //   Dnone
        let login = document.getElementById("usuarionav");
        login.classList.add("dnone");
        let register = document.getElementById("registranav");
        register.classList.add("dnone");

        let user = document.getElementById("usernav")
        user.classList.remove("dnone")
       document.getElementById("username").innerHTML="<i class='fas fa-user'></i>  "+response.data.data.email;
      })
      .catch(function(err) {
        console.log(err)
      })
  
    }
}

function getSession(){
    const token = window.localStorage.getItem('token')
    if(window.location.href.split("/")[4]==="buy.html"&&token==null||window.location.href.split("/")[4]==="cart.html"&&token==null||token!==null){
        console.log("se esta ejecutando");
        validSession()
    }else if(window.location.href.split("/")[4]==="login.html"&&token!=null||window.location.href.split("/")[4]==="register.html"&&token!=null){
      window.location.href = './index.html'
    }
}