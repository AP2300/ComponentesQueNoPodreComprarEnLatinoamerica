let query = new URLSearchParams(window.location.search)
console.log(query.get("id"))

function getUser() {
    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }

    axios.get(`http://localhost:3000/user/${query.get("id")}`, {
    'headers': { 'auth': token }
    })
    .then(res => {
        console.log(res)
        let user;
        if(res.data.success==true) {        
            user = res.data.data;
            let date = new Date(user.fecha_nacimiento);
            let mon = (date.getMonth()+1<10) ? `0${date.getMonth()+1}` : date.getMonth()+1;
            let html = `
            <h1 class="mx-auto mb-3">Editar usuario</h1>
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="data[nombre]" value="${user.nombre}"
                    required>
            </div>
            <div class="form-group">
                <label for="doc_identidad">Documento de Identidad</label>
                <input type="number" class="form-control" id="doc_identidad" name="data[doc_identidad]" value="${user.doc_identidad}" min="1" max="90000000"
                    required>
            </div>
            <div class="form-group">
                <label for="num_contacto">Numero de Teléfono</label>
                <input type="tel" class="form-control" id="num_contacto" name="data[num_contacto]" value="${user.num_contacto}"
                    required pattern="[0][2,4][0-9][0-9]-[0-9]{7}">
                <small id="num_contactoHelp" class="form-text text-muted">Formato: 0424-6320347</small>
            </div>
            <div class="form-group">
                <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                <input type="date" class="form-control" id="fecha_nacimiento" name="data[fecha_nacimiento]"
                value="${date.getFullYear()}-${mon}-${date.getDate()}"  required>
            </div>
            <div class="form-group">
                <label for="direccion">Dirección</label>
                <input type="text" class="form-control" id="direccion" name="data[direccion]"
                value="${user.direccion}"   required>
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" class="form-control" id="email"
                    aria-describedby="emailHelp" name="data[email]" value="${user.email}" required>
                <small id="emailHelp" class="form-text text-muted">No compartiremos tu correo con nadie más.</small>
            </div>
            <div class="form-group">
                <label for="clave">Contraseña</label>
                <input type="password" class="form-control" id="clave" name="data[clave]"
                  required>
            </div>
            <div class="form-group">
                <label for="clave">Rol</label>
                <select id="rol" class="custom-select">
                    
            `

            axios.get('http://localhost:3000/roles')
            .then(res => {
                console.log(res)
                if(res.data.success == true) {
                    for (const r of res.data.data) {
                        if(user.roles_id == r.id) {
                            html += `
                            <option selected value="${r.id}">${r.nombre}</option>
                            `
                        } else {
                            html += `
                            <option value="${r.id}">${r.nombre}</option>
                            `
                        }
                        
                    }
                    html += `</select>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" onclick="editUser()">Actualizar</button>
                        <button type="submit" id="cancel" class="btn btn-danger" onclick="window.location.href = './adminUsers.html'">Cancelar</button>
                    </div>`
                    document.getElementById("user").innerHTML = html;
                } else {
                    alert("Error al obtener usuario");
                    return window.location.href='./adminUsers.html';
                }
            })
            .catch(err => {
                console.error(err); 
            })
        } else {
            alert("Error al obtener usuario");
            return window.location.href='./adminUsers.html';
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

function editUser() {
    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }

    const nombre = document.getElementById("nombre").value;
    const doc_identidad = document.getElementById("doc_identidad").value;
    const num_contacto = document.getElementById("num_contacto").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const clave = document.getElementById("clave").value;
    const rol = document.getElementById("rol").value;
    console.log(rol);
  
    fechaN = new Date(fecha_nacimiento);
    fechaA = new Date;

    if(!nombre) {
      alert("El nombre esta vacío")
    }
    else if(!doc_identidad) {
      alert("La cedula está vacía")
    }
    else if(doc_identidad > 90000000 || doc_identidad < 1) {
      alert("La cedula debe estar dentro del rango 1 hasta 90.000.000")
    }
    else if(!num_contacto) {
      alert("El teléfono está vacío")
    }
    else if(!(/0[2,4][0-9][0-9]-[0-9]{7}/.test(num_contacto))) {
      alert("El teléfono no cumple con el formato especificado")
    }
    else if(!fecha_nacimiento) {
      alert("La fecha de nacimiento está vacía");
    }
    else if(parseInt(fecha_nacimiento.split("-")[0]) < 1910 || fechaN > fechaA) {
      alert("La fecha de nacimiento es menor de 1910 o es mayor a la fecha actual");
    }
    else if(!direccion) {
      alert("La dirección está vacía")
    }
    else if(!email) {
      alert("El correo está vacío")
    }
    else if(!email.includes("@") || !email.includes(".")) {
      alert("El correo tiene formato inválido")
    }
    else if(!clave) {
      alert("La clave está vacía")
    }
    else if(!rol){
      alert("No se indico un rol")
    }else {
      const jsn = {
        "nombre":nombre,
        "doc_identidad":doc_identidad,
        "num_contacto":num_contacto,
        "fecha_nacimiento":fecha_nacimiento,
        "direccion":direccion,
        "email":email,
        "clave":clave,
        "roles_id": rol
      }

      axios.put(`http://localhost:3000/user/${query.get("id")}`, jsn, {
        'headers': { 'auth': token }
        })
      .then(function (response) {
  
        if(response.data.success == true) {
          alert(response.data.msg);
          window.location.href = "./adminUsers.html";
        }
        else {
          alert(response.data.msg)
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  
    }
}