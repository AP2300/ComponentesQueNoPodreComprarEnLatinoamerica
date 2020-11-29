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

function ShowCart(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    console.log(Id)
    axios.get("http://localhost:3000/cart", {params:{ id:Id},headers: {'auth':token}})
    .then(res => {
        console.log(res)
        var html = "";
        let subTotal=0;
        let Total=0;
        if(res.data.success){
            for(let o of res.data.data){
                html+=`
                <tr>
                    <th scope="row" class="border-0">
                        <div class="p-2">
                        <img src="${o.data.foto}" alt="" width="70" class="img-fluid rounded shadow-sm">
                        <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0"> <a href="/Front/product.html?id=${o.data.id}" class="text-dark d-inline-block align-middle">${o.data.nombre}</a></h5>
                        </div>
                        </div>
                    </th>
                    <td class="border-0 align-middle"><strong>$${o.data.precio}</strong></td>
                    <td class="border-0 align-middle"> <form action="/UpdateCart" method="POST" class="addForm" id="CartForm${o.data.id}">
                        <input type="number" class="addInput" value="${o.cantidad}" name="cantidad" id="Qtty${o.data.id}" min="1" onchange="SubmitCartForm('Qtty${o.data.id}',${o.data.id})">
                        <input type="number" value="${o.data.id}" name="id" class="invisible">
                        <input type="number" value="${o.data.id}" class="invisible" name="idProducto">
                        <input type="number" value="${String(window.location.search).charAt(4)}" name="UsrId" class="invisible">
                    </form></td>
                    <form action="/DeleteFromCart" method="POST" class="addForm" id="DelForm${o.data.id}">
                        <input type="number" value="${o.data.id}" name="id" class="invisible">
                        <input type="number" value="${String(window.location.search).charAt(4)}" name="UsrId" class="invisible">
                    </form>
                    <td class="border-0 align-middle"><a href="#" class="text-dark" onclick="SubmitDelete('${o.data.id}')"><i class="fa fa-trash"></i></a></td>
                </tr>
                `
            subTotal=subTotal+Number(o.data.precio*o.cantidad);

            }
            console.log(subTotal);
            document.getElementById("load").style.display = "none"
            document.getElementById("cartList").innerHTML = html;
            document.getElementById("subTotalPrice").innerText= "$"+subTotal.toFixed(2)
            document.getElementById("discount").innerText = "15%"
            Total = subTotal-(subTotal*0.15);
            document.getElementById("TotalPrice").innerText = "$"+Total.toFixed(2)
        }else{
            document.getElementById("empty-loading").innerHTML = "<h1>Tu carrito esta vacio</h1>"
        }

    })
    .catch(err => {
        console.error(err); 
    })
}

function SubmitCartForm (idqtty,idProducto){
    let qtty = document.getElementById(`${idqtty}`).value;
    axios.post("http://localhost:3000/updatecart",{cantidad:qtty, idProducto:idProducto}, {headers: {'auth':token}})
    .then(res => {
        if(res.data.success=true){
            document.getElementById("empty-loading").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${res.data.msg}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        }else{
            document.getElementById("empty-loading").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${res.data.msg}</strong>
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

function SubmitDelete (data){
    axios.post("http://localhost:3000/deletecart",{delid:data}, {headers: {'auth':token}})
    .then(res => {
        console.log(res.data.success);
            if(res.data.success=true){
                document.getElementById("empty-loading").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${res.data.msg}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>`
                setTimeout(()=>{window.location.reload()},3000)
            }else{
                document.getElementById("empty-loading").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${res.data.msg}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>`
                setTimeout(function(){window.location.reload()},1800)
            }
    })
    .catch(err => {
        console.error(err); 
    })
}

function goToBuy(){
    window.location.href = "buy.html" 
}