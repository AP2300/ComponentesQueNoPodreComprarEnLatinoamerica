function LoadInformation(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    axios.get("http://localhost:3000/product", {params:{ id:Id}})
    .then(res => {
        let data=res.data.data;
        let dataArr=data.descripcion.split(";")
        for (const i in dataArr) {
            document.getElementById(`label${i}`).innerText = `${dataArr[i].split(":")[0]}`
            document.getElementById(`Description${i}`).value = `${dataArr[i].split(":")[1]}`
        }
        console.log(data.categoria_nombre)
        document.getElementById(`inputMedName`).value =data.nombre;
        document.getElementById(`inputMedmarca`).value =data.marca;
        document.getElementById("inputPrice").value = data.precio;
        document.getElementById("inputType").value = data.categoria_id;
        document.getElementById("inputQuantity").value = data.cantidad_stock;

    })
    .catch(err => {
        console.error(err); 
    })
}

function EditProduct(){
    let ID = window.location.search
    let urlId = new URLSearchParams(ID)
    let id = urlId.get("id")
    console.log(id);
    let dataArr = "";
    for (let i = 0; i < 6; i++ ) {
        dataArr += document.getElementById(`label${i}`).innerText + ':' + document.getElementById(`Description${i}`).value;
        if(i<5){
            dataArr += ';';
        }  
    }
    let name = document.getElementById(`inputMedName`).value;
    let marca = document.getElementById(`inputMedmarca`).value;
    let precio = document.getElementById("inputPrice").value;
    let categoria = document.getElementById("inputType").value;
    let cantidad = document.getElementById("inputQuantity").value;
    let img = document.getElementById('CustomFile').files[0];
    let notchange = document.getElementById('checking').checked;
    
    var formData = new FormData();
    formData.append("nombre",name);
    formData.append("precio",precio);
    formData.append("marca",marca);
    formData.append("categoria_id", categoria);
    formData.append("cantidad_stock", cantidad);
    formData.append("foto",img);
    formData.append("descripcion",dataArr);
    formData.append("notchange",notchange);

    axios.post("http://localhost:3000/updateproduct", formData ,{headers: {'auth':token,'Content-Type': 'multipart/form-data'},params:{id:id}})
    .then(res => {
        alert(res);
        window.location.href="catalog.html";
    })
    .catch(err => {
        console.error(err); 
    })
    
}

function handleChange(obj) {
    if(obj.checked == true){
        document.getElementById("CustomFile").setAttribute("disabled", "disabled");
    }else{
        document.getElementById("CustomFile").removeAttribute("disabled");
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
