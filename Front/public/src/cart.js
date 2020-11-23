const token = window.localStorage.getItem('token')

if(!token){
    window.location.href = './login.html'
}else {
    document.getElementById("insert").innerHTML=""
    document.getElementById("insert").innerHTML=`<li class="nav-item" id="usernav">
    <a class="nav-link hover" href="#" id="username"><i class="fas fa-user"></i></a>
</li>`
}