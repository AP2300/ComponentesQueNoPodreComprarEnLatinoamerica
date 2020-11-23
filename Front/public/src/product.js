let product;

function ShowProduct(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    axios.get("http://localhost:3000/product", {params:{ id:Id}})
    .then(res => {
        let data=res.data.data.advanced;
        let printData="";
        let f=0;
        let arr = productType(res.data.data.basic.tipo)
        for (const i in data) {
            
            printData+=`
            <div class="col-sm-4 mb-3 d-flex justify-content-center">
                <div class="card text-center" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data[i]}</h5>
                        <p class="card-text">${arr[f]}</p>
                    </div>
                </div>
            </div>`
            f++
        }
        document.getElementById("insert1").innerHTML = ` 
        <img src="${res.data.data.basic.foto}" class="imgProducto  mx-auto d-block">
        <div class="container containerProduct">
            <div class="jumbotron JProducto">
                <h1>${res.data.data.basic.nombre}</h1>
                <hr>
                <div class="row scroll">
                    ${printData}
                </div>
                <hr>
                <label>cantidad:</label>
                <input type="number" class="cantidadinput" max='${res.data.data.basic.cantidad_stock}' min="1" value="1" id= "inputcantidad">
                <button type="button" class="btn btn-dark"><i class="fas fa-plus"></i> Agregar al carrito</button>
            </div>
        </div>
        `
        f=0;
        document.body.style.backgroundColor= "whitesmoke";
    })
    .catch(err => {
        console.error(err); 
    })
}

function productType(data) {
    let arr =[];
    switch (data) {
        case "tarjeta_video":
            arr = ["Frecuencia base del reloj", "Version del PCIe","frecuencia Boost del reloj", "Ram de video", "Tipo de ram", "TDP"]
            break;
        case "ram":
            arr = ["Frecuencia", "Latencia", "Generacion", "Capacidad", "ECC"]
            break;
        case "motherboard":
            arr = ["Factor de forma", "Socket", "Chipset", "Lineas PCIe", "Tipo de canal de memoria", "Frecuencia RAM maxima", "Cantidad de puertos PCI","Cantidad de puertos PCIe", "Cantidad de puertos SATA", "Cantidad de puertos USB", "Puetos I/O", "Tipo de RAM" ]
            break;
        case "fuente_alimentacion":
            arr = ["Potencia", "Factor_forma", "Modularidad", "Tipo_alimentacion", "Certificacion"]
            break;
        case "cpu":
                arr = ["Frecuencia", "Nucleos/Hilos", "Socket", "Proceso de fabricacion", "Caches", "TDP"]
                break;
        case "case":
            arr = ["Factor de forma", "Ventiladores", "Puertos frontales", "Bahias para radiador", "Bahias de almacenamiento"]
            break;
        case "almacenamiento":
            arr = ["Capacidad","Factor de forma", "Tipo", "Velocidad de escritura", "Velocidad de lectura", "RPM"]
            break;
        default:
            break;
    }

    return arr;
}

function AddToCart() {
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    let cantidad = document.getElementById("inputcantidad").value;
    axios.post("http://localhost:3000/addcart",{body:{correo:window.correo, ID:Number(Id), cantidad:cantidad}})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}