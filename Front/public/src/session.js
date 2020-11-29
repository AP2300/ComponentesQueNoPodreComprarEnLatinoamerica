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
            console.log(response.data);
            if(response.data.log===true){
                correo = response.data.data.email;
                idUser = response.data.id;
                rol = response.data.data.roles_id;
                if(!token){
                    console.log("adsad");
                    document.getElementById("insert").innerHTML= `<li class="nav-item" id="usuarionav">
                    <a class="nav-link hover" href="/Front/login.html"><i class="fas fa-user"></i> Iniciar sesión</a>
                  </li>
                  <li class="nav-item" id="registranav">
                      <a class="nav-link hover" href="/Front/register.html"><i class="fas fa-user"></i> Registrarse</a>
                  </li>`
                }else{
                    document.getElementById("insert").innerHTML=`<span tabindex="0"  data-toggle="popover" data-trigger="focus" data-placement="bottom"  id="username"><i class="fas fa-user"></i> </span>
                    <a href="#" onclick="goCart()"><i class="fas fa-shopping-cart"></i></a>`
                    console.log(rol);
                    if(rol===1) {
                        var options = `<a class="nav-link hover" href="/Front/admin.html"><i class="fas fa-user-cog"></i> Panel Administrativo</a>
                        <a class="nav-link hover" href="/Front/CloseSession.html" ><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`
                    } else {
                        var options = `<a class="nav-link hover" href="/Front/CloseSession.html" ><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`;
                    }
                    document.getElementById("username").innerHTML="<i class='fas fa-user'></i>  "+response.data.data.email;

                
                    $(document).ready(function () {
                        $('[data-toggle="popover"]').popover({
                            trigger: "click",
                            html: true,
                            content: options
                        })
                    })
                }

                if(window.location.href.split("/")[4].search("admin")!=-1&&rol===2
                ||window.location.href.split("/")[4].search("edit")!=-1&&rol===2){
                    window.location.href="index.html";
                }
            }
        })
        .catch(function(err) {
            console.log(err)
        })
    
    }
}

function getSession(){
    const token = window.localStorage.getItem('token');
    if(!token){
        document.getElementById("insert").innerHTML= `<li class="nav-item" id="usuarionav">
        <a class="nav-link hover" href="/Front/login.html"><i class="fas fa-user"></i> Iniciar sesión</a>
      </li>
      <li class="nav-item" id="registranav">
          <a class="nav-link hover" href="/Front/register.html"><i class="fas fa-user"></i> Registrarse</a>
      </li>`
    }
    if(window.location.href.split("/")[4]==="buy.html"&&token==null||window.location.href.split("/")[4].search("cart")!=-1&&token==null||token!==null||window.location.href.split("/")[4]==="admin.html"&&token==null){
        validSession()
    }else if(window.location.href.split("/")[4]==="login.html"&&token!=null||window.location.href.split("/")[4]==="register.html"&&token!=null){
      window.location.href = './index.html';
    }
}

function goCart(){
    window.location.href = './cart.html?id=' + idUser;
}

function CloseSession() {
    window.localStorage.removeItem("token");
    window.location.href="index.html"
}