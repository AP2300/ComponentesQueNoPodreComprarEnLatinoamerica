function LoadData (){
    axios.get("http://localhost:3000/index")
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}

const token = window.localStorage.getItem('token')

if(!token){
    document.getElementById("insert").innerHTML= `<li class="nav-item" id="usuarionav">
    <a class="nav-link hover" href="/Front/login.html"><i class="fas fa-user"></i> Iniciar sesión</a>
  </li>
  <li class="nav-item" id="registranav">
      <a class="nav-link hover" href="/Front/register.html"><i class="fas fa-user"></i> Registrarse</a>
  </li>`
}else{
    document.getElementById("insert").innerHTML=""
    document.getElementById("insert").innerHTML=`<li class="nav-item" id="usernav">
    <a class="nav-link hover" href="#" id="username"><i class="fas fa-user"></i> Registrarse</a>
</li>`
}