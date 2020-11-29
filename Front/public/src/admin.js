$(document).ready(function(){
    $("#UsersPanel").collapse("hide")
    $("#ProductsPanel").collapse("hide")
    $("#VentasPanel").collapse("hide")

    $("#Productos").click(function () { 
        $("#UsersPanel").collapse("hide")
        $("#VentasPanel").collapse("hide")
        document.getElementById("textSelection").innerHTML="Administre los productos";
    });
    $("#Users").click(function () { 
        $("#ProductsPanel").collapse("hide")
        $("#VentasPanel").collapse("hide")
        document.getElementById("textSelection").innerHTML="Administre los usuarios";
    });
    $("#Ventas").click(function () { 
        $("#UsersPanel").collapse("hide")
        $("#ProductsPanel").collapse("hide")
        document.getElementById("textSelection").innerHTML="Visualice las ventas";
    });
}); 

$('#imagenP').on('change',function(){
    var fileName = $(this).val();
    $(this).next('.custom-file-label').html(fileName.replace('C:\\fakepath\\', " "));
})

document.getElementById("bt").addEventListener("click", function(event){
    event.preventDefault()
});

function getCategoryInfo() {
    axios.get('http://localhost:3000/categories')
    .then(res => {
        console.log(res);
        let categories = [];
        let html = '';
        if(res.data.success === false) {
            html = "<option disabled>No hay categorias</option>";
        } else {
            html += `<option disabled>Elegir...</option>`;
            for (const c of res.data.data) {
                html += `<option value="${c.id}">${c.nombre}</option>`;
            }
        }

        document.getElementById('inputType').innerHTML = html;        
    })
    .catch(err => {
        console.error(err); 
    })

}

function createProduct() {
    const nameP = document.getElementById("nameP").value;
    const priceP = document.getElementById("priceP").value;
    const stockP = document.getElementById("stockP").value;
    const inputType = document.getElementById("inputType").value;
    const marcaP = document.getElementById("marcaP").value;
    const imagenP = document.getElementById("imagenP");
    const descripcionP = document.getElementById("descripcionP").value;

    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }

    if (!nameP) {
        alert("El nombre está vacío")
    }
    else if (!priceP) {
        alert("El precio está vacío")
    }
    else if (priceP < 1) {
        alert("El precio no puede ser menor a 1")
    }
    else if (!stockP) {
        alert("La cantidad de stock está vacía")
    }
    else if (stockP < 1) {
        alert("El stock no puede ser menor a 1")
    }
    else if (!marcaP) {
        alert("La marca está vacía")
    }
    else if (!imagenP) {
        alert("No se seleccionó una imagen")
    }
    else if (!descripcionP) {
       alert("La descripción está vacía")
    }
    else {
        var formData = new FormData();
        if(imagenP) {
            formData.append("foto", imagenP.files[0]);
            for (const i of formData.entries()) {
                console.log(i);
            } 
        }

        formData.append("nombre", nameP);
        formData.append("precio", priceP);
        formData.append("cantidad_stock", stockP);
        formData.append("categoria_id", inputType);
        formData.append("marca", marcaP);
        formData.append("descripcion", descripcionP);

        axios.post('http://localhost:3000/product', formData, {
            'headers': { 'auth': token }
        })
        .then(res => {
            console.log(res)
            alert(res.data.msg);
            window.location.href = "./admin.html";
        })
        .catch(err => {
            console.error(err); 
        })
    }
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