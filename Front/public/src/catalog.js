var productos;
var filter="";
const token = window.localStorage.getItem('token')

function Loadcatalog(){
    axios.get("http://localhost:3000/catalog")
    .then(res => {
        console.log(res.data);
        productos = res.data.data;
        buscar(productos, filter);
    })
    .catch(err => {
        console.error(err); 
    })
}

function buscar(Data, filter){
    let text = document.getElementById("Busqueda").value.toLowerCase();
    text.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
    let reg = new RegExp(`\\b${text}`, 'i');
    let html = "";    

    for(let producto of Data){
        if(reg.test(producto.nombre)&&producto.tipo===filter&&producto.cantidad_stock>0||reg.test(producto.nombre)&&filter==="Todos"&&producto.cantidad_stock>0
        ||reg.test(producto.nombre)&&filter===""&&producto.cantidad_stock>0){
            html+=`
            <div class="col mb-4">
                <a class="product" onclick="redirect(${producto.id})" style="cursor: pointer">
                    <div class="card card-producto h-100">
                        <img src="${producto.foto}" class="card-img-top" >
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Categoria: ${producto.categoria}</p>
                        </div>
                        <div class="card-footer" id="catalogPage">
                            <small class="text-muted">Precio: ${producto.precio}$</small>
                        </div>
                    </div>
                </a>
            </div>`
        }
    }
    document.getElementById("productos").innerHTML=html;
}

$("ol").on("click","li", function (){
    var cat=$(this).text();
    filter=cat;
    $(".breadcrumb-item").removeClass("activo");
    $(this).toggleClass("activo");
    buscar(productos,filter);
})



if(!token){
    document.getElementById("insert").innerHTML= `<li class="nav-item" id="usuarionav">
    <a class="nav-link hover" href="/Front/login.html"><i class="fas fa-user"></i> Iniciar sesión</a>
  </li>
  <li class="nav-item" id="registranav">
      <a class="nav-link hover" href="/Front/register.html"><i class="fas fa-user"></i> Registrarse</a>
  </li>`
}else{
    document.getElementById("insert").innerHTML=""
    document.getElementById("insert").innerHTML=`<span tabindex="0"  data-toggle="popover" data-trigger="focus" data-placement="bottom"  id="username"><i class="fas fa-user"></i> </span>
    <a href="/UserCart/<%=Sesion.id%>"><i class="fas fa-shopping-cart"></i></a>`

    if(isAdmin()) {
        var options = `<a class="nav-link hover" href="/Front/admin.html"><i class="fas fa-user-cog"></i> Panel Administrativo</a>
        <a class="nav-link hover" href="/Front/SessionClose"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`
    } else {
        var options = `<a class="nav-link hover" href="/Front/SessionClose"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`;
    }

    $(document).ready(function () {
        $('[data-toggle="popover"]').popover({
            trigger: "click",
            html: true,
            content: options
        })
    })
}

function redirect(data){
    window.location.href="product.html?id="+data;
}

