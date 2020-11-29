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
                let mon = (date.getMonth()+1<10) ? `0${date.getMonth()+1}` : date.getMonth()+1;
                html += `
                <div class="accordion " id="accordion">
                    <div class="card comentarios">
                        <div>
                            <div class="card-header" id="headingThree">
                                <h2 class="mb-0 " >
                                <div class="row">
                                    <div class="col-sm">
                                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                        data-target="#collapse${u.id}">
                                        
                                            <div class="col-sm">
                                                Nombre: ${u.nombre}
                                            </div>
                                            <div class="col-sm">
                                                Correo: ${u.email}
                                            </div>
                                        
                                    </button>
                                    </div>
                                    <span style="position: relative;">
                                    <span class="btn btne mr-2" type="button" onclick="editarUsuario(${u.id})" id="edit"><i class="far fa-edit" ></i></span>
                                    <span class="btn btnd" type="button" onclick="borrarUsuario(${u.id})"><i class="far fa-trash-alt"></i></span>
                                </div>
                                </h2>
                                    
                            </div>
                            
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
                                        Fecha de Nacimiento: ${date.getDate()}/${mon}/${date.getFullYear()}
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

