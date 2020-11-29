let product;

function ShowProduct(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    axios.get("http://localhost:3000/product", {params:{ id:Id}})
    .then(res => {
        let data=res.data.data;
        let dataArr=data.descripcion.split(";")
        let dataArr2=dataArr[0].split(":")
        console.log(dataArr2);
        let printData="";
        let f=0;
        // let arr = productType(res.data.data.basic.tipo)
        for (const i in dataArr) {
            
            printData+=`
            <div class="col-sm-4 mb-3 d-flex justify-content-center">
                <div class="card text-center" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${dataArr[i].split(":")[0]}</h5>
                        <p class="card-text">${dataArr[i].split(":")[1]}</p>
                    </div>
                </div>
            </div>`
            f++
        }
        document.getElementById("insert1").innerHTML = ` 
        <img src="${data.foto}" class="imgProducto  mx-auto d-block">
        <div class="container containerProduct">
            <div class="jumbotron JProducto">
                <h1>${data.nombre}</h1>
                <hr>
                <div class="row scroll">
                    ${printData}
                </div>
                <hr>
                <label>cantidad:</label>
                <input type="number" class="cantidadinput" max='${data.cantidad_stock}' min="1" value="1" id= "inputcantidad">
                <button type="button" onclick="AddToCart()" class="btn btn-dark"><i class="fas fa-plus"></i> Agregar al carrito</button>
            </div>
        </div>
        `
        f=0;
        document.getElementById("body").style.backgroundImage= "none"
    })
    .catch(err => {
        console.error(err); 
    })
}


function AddToCart() {
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    let cantidad = document.getElementById("inputcantidad").value;
    axios.post("http://localhost:3000/addcart",{id:idUser, ID:Number(Id), cantidad:cantidad}, {headers: {'auth':token}})
    .then(res => {
        console.log(res.data.success);
        if(res.data.success===true){
            document.getElementById("body").innerHTML+=`<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Producto añadido exitosamente al carrito</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>`

        setTimeout(() => {
            window.location.href= "catalog.html"
        }, 1000);
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

const token = window.localStorage.getItem('token')

