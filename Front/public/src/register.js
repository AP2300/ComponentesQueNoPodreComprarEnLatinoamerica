function register() {
    const nombre = document.getElementById("nombre").value;
    const doc_identidad = document.getElementById("doc_identidad").value;
    const num_contacto = document.getElementById("num_contacto").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const clave = document.getElementById("clave").value;
  
    console.log(nombre, doc_identidad, num_contacto, fecha_nacimiento, direccion, email, clave);
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

