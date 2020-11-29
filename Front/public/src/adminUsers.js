function listUsers() {
    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }

    let html = `<h1 class="mb-4 mx-auto">Lista de usuarios</h1>`;

    axios.get(`http://localhost:3000/users`, {
        'headers': { 'auth': token }
    })
    .then(res => {
        console.log(res)
        if(res.data.success == true && res.data.msg!="No hay usuarios para mostrar") {
            for (const u of res.data.data) {
                let date = new Date(u.fecha_nacimiento);
                html += `
                <div class="accordion " id="accordion">
                    <div class="card comentarios">
                        <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                    data-target="#collapse${u.id}">
                                    <div class="row">
                                        <div class="col-sm">
                                            Nombre: ${u.nombre}
                                        </div>
                                        <div class="col-sm">
                                            Correo: ${u.email}
                                        </div>
                                        <span class="btn btne btn-alert mr-2" type="" onclick="editarUsuario(${u.id})" id="edit"><i class="far fa-edit" ></i></span>
                                        <span class="btn btnd" type="" onclick="borrarUsuario(${u.id})"><i class="far fa-trash-alt"></i></span>
                                    </div>
                                </button>
                            </h2>
                        </div>
        
                        <div id="collapse${u.id}" class="collapse">
                            <div class="card-body ">
                                <div class="row">
                                    <div class="col-sm">
                                        Documento de Identidad: ${u.doc_identidad}
                                    </div>
                                    <div class="col-sm">
                                        Numero de Contacto: ${u.num_contacto}
                                    </div>
                                    <div class="col-sm">
                                        Fecha de Nacimiento: ${date.getDate()}/${parseInt(date.getMonth())+1}/${date.getFullYear()}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm">
                                        Correo: ${u.email}
                                    </div>
                                    <div class="col-sm">
                                        Contraseña: ******
                                    </div>
                                    <div class="col-sm">
                                        Rol: ${u.rol}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    
                                    <div class="col-sm">
                                        Dirección: ${u.direccion}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                
            }
        } else {
            html += `<p class="mt-4 mb-4 mx-auto">No hay usuarios para mostrar</p>`;
        }
        document.getElementById("loading").innerHTML = html;
    })
    .catch(err => {
        console.error(err); 
    })    
}

function editarUsuario(id) {
    window.location.href = `./editUser.html?id=${id}`;
}

function borrarUsuario(id) {
    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }

    let opc = confirm("Esta seguro que desea eliminar el usuario?");
    console.log(opc);
    if(opc) {
        axios.delete(`http://localhost:3000/user/${id}`, {
        'headers': { 'auth': token }
        })
        .then(res => {
            console.log(res)
            if(res.data.success == true) {
                alert(res.data.msg);
                window.location.href = "./adminUsers.html";
            }
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