function login() {
    const email = document.getElementById("Email").value;
    const clave = document.getElementById("Clave").value;
    // const check = document.getElementById("check").checked;
    
    // console.log(check )
    if(!email) {
      alert("El email esta vacio")
    }
    else if(!clave) {
      alert("La clave esta vacia")
    }
    else {
      const jsn = {
        email:email,
        clave:clave
      }
      
      axios.post('http://localhost:3000/login',jsn)
      .then(function (response) {
            console.log(response.data);
  
            if(response.data.success == true) {
                window.localStorage.setItem('token', response.data.token)
                window.location.href = './../Front/index.html'
            }
            else {
            alert(response.data.msg)
            }
        })
        .catch(function(err) {
            console.log("error");
            console.log(jsn);
            console.log(err)
        })
  
  
    }
}
