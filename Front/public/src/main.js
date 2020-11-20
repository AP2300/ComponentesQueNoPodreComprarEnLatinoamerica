
function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
  
    if(!name) {
      alert("Nombre esta vacio")
    }
    else if(!email) {
      alert("Correo vacio")
    }
    else if(!pass) {
      alert("Clava vacia")
    }
    else {
      const jsn = {
        "name":name,
        "email":email,
        "pass":pass
      }
  
      axios.post('http://localhost:3000/register', jsn)
      .then(function (response) {
        console.log(response.data)
  
        if(response.data.success == true) {
          alert(response.data.msg);
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("pass").value = "";
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

