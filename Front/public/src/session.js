var correo = "";
var idUser = "";

function validSession() {
    const token = window.localStorage.getItem('token');
    
    if(token == null) {
      window.location.href = './login.html'
    }else{
        axios.get('http://localhost:3000/user', {
            'headers': {'auth':token}
        })
        .then(function (response){
            if(response.data.log===true){
                correo = response.data.data.email;
                idUser = response.data.id;
                console.log(idUser);
                document.getElementById("username").innerHTML="<i class='fas fa-user'></i>  "+response.data.data.email;
            }
        })
        .catch(function(err) {
            console.log(err)
        })
    
    }
}

function getSession(){
    const token = window.localStorage.getItem('token');
    if(window.location.href.split("/")[4]==="buy.html"&&token!==null||window.location.href.split("/")[4]==="cart.html"&&token==null||token!==null){
        validSession()
    }else if(window.location.href.split("/")[4]==="login.html"&&token!=null||window.location.href.split("/")[4]==="register.html"&&token!=null){
      window.location.href = './index.html'
    }
}

function goCart(){
    window.location.href = './cart.html?id=' + idUser;
}