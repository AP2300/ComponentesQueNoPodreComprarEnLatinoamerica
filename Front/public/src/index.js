function LoadData (){
    const token = window.localStorage.getItem("token")
    axios.get("http://localhost:3000/index", {headers:{"auth":token}})
    .then(res => {
        if(res.data!=undefined){
            let temp="";
            let data = res.data.data
            console.log(data[0]);
                for (let i=0; i<3;i++) {
                let dataArr = data[i].descripcion.split(";")
                temp+=`
                <div class="card" onclick="GoToProduct(${data[i].id})" style="cursor: pointer;">
                <img src="${data[i].foto}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${data[i].nombre}</h5>
                  <p class="card-text">${dataArr[i].split(":")[0]} : ${dataArr[i].split(":")[1]}</p>
                  <p class="card-text"><small class="text-muted">$${data[i].precio}</small></p>
                </div>
              </div>`
            }
          document.getElementById("insertCard").innerHTML= temp;
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

function GoToProduct(data){
    window.location.href = "product.html?id="+data
}


