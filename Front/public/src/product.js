let product;

function ShowProduct(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    axios.get("http://localhost:3000/product", {params:{ id:Id}})
    .then(res => {
        let data=res.data.data;
        let dataArr=data.descripcion.split(";")
        let dataArr2=dataArr[0].split(":")
        console.log(dataArr2);
        let printData="";
        let f=0;
        // let arr = productType(res.data.data.basic.tipo)
        for (const i in dataArr) {
            
            printData+=`
            <div class="col-sm-4 mb-3 d-flex justify-content-center">
                <div class="card text-center" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${dataArr[i].split(":")[0]}</h5>
                        <p class="card-text">${dataArr[i].split(":")[1]}</p>
                    </div>
                </div>
            </div>`
            f++
        }
        document.getElementById("insert1").innerHTML = ` 
        <img src="${data.foto}" class="imgProducto  mx-auto d-block">
        <div class="container containerProduct">
            <div class="jumbotron JProducto">
                <h1>${data.nombre}</h1>
                <hr>
                <div class="row scroll">
                    ${printData}
                </div>
                <hr>
                <label>cantidad:</label>
                <input type="number" class="cantidadinput" max='${data.cantidad_stock}' min="1" value="1" id= "inputcantidad">
                <button type="button" onclick="AddToCart()" class="btn btn-dark"><i class="fas fa-plus"></i> Agregar al carrito</button>
            </div>
        </div>
        `
        f=0;
        document.getElementById("body").style.backgroundImage= "none"
    })
    .catch(err => {
        console.error(err); 
    })
}


function AddToCart() {
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    let cantidad = document.getElementById("inputcantidad").value;
    axios.post("http://localhost:3000/addcart",{id:idUser, ID:Number(Id), cantidad:cantidad}, {headers: {'auth':token}})
    .then(res => {
        console.log(res.data.success);
        if(res.data.success===true){
            document.getElementById("body").innerHTML+=`<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Producto añadido exitosamente al carrito</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>`
        }
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
    document.getElementById("insert").innerHTML=`<span tabindex="0"  data-toggle="popover" data-trigger="focus" data-placement="bottom"  id="username"><i class="fas fa-user"></i> </span>
    <a href="#" onclick="goCart()"><i class="fas fa-shopping-cart"></i></a>`

    if(isAdmin()) {
        var options = `<a class="nav-link hover" href="/Front/admin.html"><i class="fas fa-user-cog"></i> Panel Administrativo</a>
        <a class="nav-link hover" href="#" id="CloseSession"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`
    } else {
        var options = `<a class="nav-link hover" href="#" id="CloseSession"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`;
    }
    
    $(document).ready(function () {
        $('[data-toggle="popover"]').popover({
            trigger: "click",
            html: true,
            content: options
        })
    })
}