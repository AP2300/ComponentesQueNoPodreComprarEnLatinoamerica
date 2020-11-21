function validSession() {
    const token = window.localStorage.getItem('token')
    
    if(token == null) {
      window.location.href = './login.html'
    }else {
      axios.get('http://localhost:3000/user', {
        'headers': {'auth':token}
      })
      .then(function (response) {
        //   Dnone
        let login = document.getElementById("usuarionav");
        login.classList.add("dnone");
        let register = document.getElementById("registernav");
        register.classList.add("dnone");
      })
      .catch(function(err) {
        console.log(err)
      })
  
    }
}

function getSession(){
    const token = window.localStorage.getItem('token')
    if(window.location.href.split("/")[4]==="buy.html"&&token==null||window.location.href.split("/")[4]==="cart.html"&&token==null){
        validSession()
    }else if(window.location.href.split("/")[4]==="login.html"&&token!=null||window.location.href.split("/")[4]==="register.html"&&token!=null){
      window.location.href = './index.html'
    }
}