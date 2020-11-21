function register() {
    const nombre = document.getElementById("nombre").value;
    const doc_identidad = document.getElementById("doc_identidad").value;
    const num_contacto = document.getElementById("num_contacto").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const clave = document.getElementById("clave").value;
  
    console.log(nombre, doc_identidad, num_contacto, fecha_nacimiento, direccion, email, clave);

    if(!nombre) {
      alert("Nombre esta vacio")
    }
    else if(!email) {
      alert("Correo vacio")
    }
    else if(!clave) {
      alert("Clava vacia")
    }
    else {
      const jsn = {
        "nombre":nombre,
        "doc_identidad":doc_identidad,
        "num_contacto":num_contacto,
        "fecha_nacimiento":fecha_nacimiento,
        "direccion":direccion,
        "email":email,
        "clave":clave
      }

      axios.post('http://localhost:3000/register', jsn)
      .then(function (response) {
        console.log(response.data)
  
        if(response.data.success == true) {
          alert(response.data.msg);
          window.location.href = "/Front/login.html";
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

