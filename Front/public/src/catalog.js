var productos;
var filter="";
var isAdmin;
const token = window.localStorage.getItem('token')

function Loadcatalog(){
    axios.get("http://localhost:3000/catalog")
    .then(res => {
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
        if(reg.test(producto.nombre)&&producto.categoria===filter&&producto.cantidad_stock>0||reg.test(producto.nombre)&&filter==="Todos"&&producto.cantidad_stock>0
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
                        </a>
                        <div class="card-footer" id="catalogPage${producto.id}">
                            <small class="text-muted">Precio: ${producto.precio}$</small>
                        </div>
                    </div>
            </div>`
        }
    }
    document.getElementById("productos").innerHTML=html;
    Admin(filter,reg);
}

function Admin(filter, reg) {
    if(isAdmin == true){
        for(let producto of productos){
            if(reg.test(producto.nombre)&&producto.categoria===filter&&producto.cantidad_stock>0||reg.test(producto.nombre)&&filter==="Todos"&&producto.cantidad_stock>0
            ||reg.test(producto.nombre)&&filter===""&&producto.cantidad_stock>0){
                document.getElementById(`catalogPage${producto.id}`).innerHTML += `<br>
                <span class="btn btns btn-alert mt-2" role="button" id="edit" onclick="editarProducto(${producto.id})"><i class="far fa-edit"></i></span>
                <span class="btn btns mt-2" type="" onclick="borrarProducto(${producto.id})" id="boton"><i class="far fa-trash-alt"></i></span>`;
            }
        } 
    }
}

function borrarProducto(id) {
    var res = confirm("Está seguro de que desea eliminar el producto?");

    if(res) {
        console.log(`eliminado ${id}`);
        axios.post("http://localhost:3000/deleteproduct", null,{headers: {'auth':token},params:{id:id}})
        .then(res => {
            alert(res.data.msg);
            window.location.href="catalog.html";
        })
        .catch(err => {
            alert(err.data.msg);
            console.error(err); 
        })
    }
}

function editarProducto(id) {
    window.location.href = `EditProduct.html?id=`+id;
}

$("ol").on("click","li", function (){
    var cat=$(this).text();
    console.log(cat);
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
    <a href="#" onclick="goCart()"><i class="fas fa-shopping-cart"></i></a>`

    if(isAdmin()) {
        var options = `<a class="nav-link hover" href="/Front/admin.html"><i class="fas fa-user-cog"></i> Panel Administrativo</a>
        <a class="nav-link hover" href="/Front/SessionClose"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`
        isAdmin = true;
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

