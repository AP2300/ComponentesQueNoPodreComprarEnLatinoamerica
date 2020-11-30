$(document).ready(function(){
    $("#UsersPanel").collapse("hide")
    $("#ProductsPanel").collapse("hide")
    $("#VentasPanel").collapse("hide")

    $("#Productos").click(function () { 
        $("#UsersPanel").collapse("hide")
        $("#VentasPanel").collapse("hide")
        document.getElementById("textSelection").innerHTML="Administre los productos";
    });
    $("#Users").click(function () { 
        $("#ProductsPanel").collapse("hide")
        $("#VentasPanel").collapse("hide")
        document.getElementById("textSelection").innerHTML="Administre los usuarios";
    });
    $("#Ventas").click(function () { 
        $("#UsersPanel").collapse("hide")
        $("#ProductsPanel").collapse("hide")
        document.getElementById("textSelection").innerHTML="Historial de ventas";
    });
}); 

$('#imagenP').on('change',function(){
    var fileName = $(this).val();
    $(this).next('.custom-file-label').html(fileName.replace('C:\\fakepath\\', " "));
})

document.getElementById("bt").addEventListener("click", function(event){
    event.preventDefault()
});

function getCategoryInfo() {
    axios.get('http://localhost:3000/categories')
    .then(res => {
        console.log(res);
        let categories = [];
        let html = '';
        if(res.data.success === false) {
            html = "<option disabled>No hay categorias</option>";
        } else {
            html += `<option selected disabled>Elegir...</option>`;
            for (const c of res.data.data) {
                html += `<option value="${c.id}">${c.nombre}</option>`;
            }
        }

        document.getElementById('inputType').innerHTML = html;        
    })
    .catch(err => {
        console.error(err); 
    })

}

function getRolesInfo() {
    axios.get('http://localhost:3000/roles')
    .then(res => {
        console.log(res);
        let html = '';
        if(res.data.success === false) {
            html = "<option disabled>No hay roles</option>";
        } else {
            html += `<option disabled>Elegir...</option>`;
            for (const r of res.data.data) {
                html += `<option value="${r.id}">${r.nombre}</option>`;
            }
        }

        document.getElementById('tipoU').innerHTML = html;        
    })
    .catch(err => {
        console.error(err); 
    })

}

function registerUser() {
    const nombre = document.getElementById("nameU").value;
    const doc_identidad = document.getElementById("cedula").value;
    const num_contacto = document.getElementById("telefono").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const clave = document.getElementById("clave").value;
    const rol = document.getElementById("tipoU").value

    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }

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
        "rol": rol
      }

        axios.post('http://localhost:3000/register', jsn)
        .then(res => {
            console.log(res)
            alert(res.data.msg);
            window.location.href = "./admin.html";
        })
        .catch(err => {
            console.error(err); 
        })
    }
}

function createProduct() {
    const nameP = document.getElementById("nameP").value;
    const priceP = document.getElementById("priceP").value;
    const stockP = document.getElementById("stockP").value;
    const inputType = document.getElementById("inputType").value;
    const marcaP = document.getElementById("marcaP").value;
    const imagenP = document.getElementById("imagenP");
    if(!document.getElementById("descripcion1")) {
        return alert("No se ha seleccionado un tipo de producto");
    }
    var descripcion = [];
    descripcion[0] = document.getElementById("descripcion1").value;
    descripcion[1] = document.getElementById("descripcion2").value;
    descripcion[2] = document.getElementById("descripcion3").value;
    descripcion[3] = document.getElementById("descripcion4").value;
    descripcion[4] = document.getElementById("descripcion5").value;
    descripcion[5] = document.getElementById("descripcion6").value;
    var des = ``;
    for (let i=0; i<6; i++) {
        console.log('d'+(i+1));
        let d = document.getElementById('d'+(i+1)).innerText;
        if (!descripcion[i]) {
            return alert(`${d} está vacía`);
        }
        let str = `${d}:${descripcion[i]};`;
        des += str;
    }
    des = des.substring(0, des.length - 1);
    console.log(des);

    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }
    
    if (!nameP) {
        alert("El nombre está vacío")
    }
    else if (!priceP) {
        alert("El precio está vacío")
    }
    else if (priceP < 1) {
        alert("El precio no puede ser menor a 1")
    }
    else if (!stockP) {
        alert("La cantidad de stock está vacía")
    }
    else if (stockP < 1) {
        alert("El stock no puede ser menor a 1")
    }
    else if (!marcaP) {
        alert("La marca está vacía")
    }
    else if (!imagenP) {
        alert("No se seleccionó una imagen")
    }
    else {
        var formData = new FormData();
        if(imagenP) {
            formData.append("foto", imagenP.files[0]);
            for (const i of formData.entries()) {
                console.log(i);
            } 
        }

        formData.append("nombre", nameP);
        formData.append("precio", priceP);
        formData.append("cantidad_stock", stockP);
        formData.append("categoria_id", inputType);
        formData.append("marca", marcaP);
        formData.append("descripcion", des);

        axios.post('http://localhost:3000/product', formData, {
            'headers': { 'auth': token }
        })
        .then(res => {
            console.log(res)
            alert(res.data.msg);
            window.location.href = "./admin.html";
        })
        .catch(err => {
            console.error(err); 
        })
    }
}

function getType() {
    let html = `
    <div class="form-row">
        <div class="form-group col-md-4">
            <label for="descripcion1" id="d1"></label>
            <input type="text" class="form-control" id="descripcion1" rows="3">
        </div>
        <div class="form-group col-md-4">
            <label for="descripcion2" id="d2"></label>
            <input type="text" class="form-control" id="descripcion2" rows="3">
        </div>
        <div class="form-group col-md-4">
            <label for="descripcion3" id="d3"></label>
            <input type="text" class="form-control" id="descripcion3" rows="3">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-4" >
            <label for="descripcion4" id="d4"></label>
            <input type="text" class="form-control" id="descripcion4" rows="3">
        </div>
        <div class="form-group col-md-4" >
            <label for="descripcion5" id="d5"></label>
            <input type="text" class="form-control" id="descripcion5" rows="3">
        </div>
        <div class="form-group col-md-4">
            <label for="descripcion6" id="d6"></label>
            <input type="text" class="form-control" id="descripcion6" rows="3">
        </div>
    </div>
    `;

    document.getElementById("des").innerHTML = html;

    let type = document.getElementById("inputType").value;

    switch(type) {
        case "1":
            document.getElementById('d1').innerText = 'Frecuencia';
            document.getElementById('d2').innerText = 'Frecuencia Máxima';
            document.getElementById('d3').innerText = 'Núcleos/Hilos';
            document.getElementById('d4').innerText = 'TDP';
            document.getElementById('d5').innerText = 'Socket';
            document.getElementById('d6').innerText = 'RAM Permitida';
            break;
        case "2":
            document.getElementById('d1').innerText = 'Frecuencia';
            document.getElementById('d2').innerText = 'Tipo';
            document.getElementById('d3').innerText = 'Capacidad';
            document.getElementById('d4').innerText = 'Latencias';
            document.getElementById('d5').innerText = 'ECC';
            document.getElementById('d6').innerText = 'RGB';
            break;
        case "3":
            document.getElementById('d1').innerText = 'Socket';
            document.getElementById('d2').innerText = 'Chipset';
            document.getElementById('d3').innerText = 'Tipo y Slots de RAM';
            document.getElementById('d4').innerText = 'Puertos PCIe';
            document.getElementById('d5').innerText = 'Memoria Máxima';
            document.getElementById('d6').innerText = 'Factor de Forma';
            break;
        case "4":
            document.getElementById('d1').innerText = 'Frecuencia';
            document.getElementById('d2').innerText = 'Frecuencia Boost';
            document.getElementById('d3').innerText = 'RAM de Video';
            document.getElementById('d4').innerText = 'Version del PCIe';
            document.getElementById('d5').innerText = 'Resolucion Máxima Admitida';
            document.getElementById('d6').innerText = 'Conexiones de Video';
            break;
        case "5":
            document.getElementById('d1').innerText = 'Capacidad';
            document.getElementById('d2').innerText = 'Factor de Forma';
            document.getElementById('d3').innerText = 'Interfaz';
            document.getElementById('d4').innerText = 'Dimensiones (largo, ancho y alto)';
            document.getElementById('d5').innerText = 'Rendimiento de lectura secuencial';
            document.getElementById('d6').innerText = 'Rendimiento de escritura secuencial';
            break;
        case "6":
            document.getElementById('d1').innerText = 'Potencia';
            document.getElementById('d2').innerText = 'Certificacion';
            document.getElementById('d3').innerText = 'Modularidad';
            document.getElementById('d4').innerText = 'Factor de forma';
            document.getElementById('d5').innerText = 'Salida unica de 12v';
            document.getElementById('d6').innerText = 'Modo 0 RPM';
            
            break;
        case "7": 
        document.getElementById('d1').innerText = 'Factor de Forma';
        document.getElementById('d2').innerText = 'Ventiladores Incluidos';
        document.getElementById('d3').innerText = 'Puertos I/O';
        document.getElementById('d4').innerText = 'Cantidad de Bahias de Radiador';
        document.getElementById('d5').innerText = 'Cantidad de Bahias de Almacenamiento';
        document.getElementById('d6').innerText = 'Cantidad de Bahias de Ventilador';
            break;
    }
}

function getSales() {
    let token = window.localStorage.getItem('token');
    if (token == null) {
        token = window.sessionStorage.getItem('token');
    }

    axios.get('http://localhost:3000/sales', {
        'headers': { 'auth': token }
    })
    .then(res => {
        console.log(res)
        let html = ``;
        if(res.data.success==true) {
            for (const v of res.data.ventas) {
                let fechaEntrega = new Date(v.fecha_entrega);
                let fechaProcesado = new Date(v.fecha_procesado);
                
                html += `
                <div class="accordion " id="accordion">
                    <div class="card comentarios">
                        <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                    data-target="#collapse${v.tracking}">
                                    <div class="row">
                                        <div class="col-sm">
                                            Orden #${v.tracking} a nombre de ${v.email}
                                        </div>                                            
                                    </div>
                                </button>
                            </h2>
                        </div>

                        <div id="collapse${v.tracking}" class="collapse">
                            <div class="card-body mx-auto">
                                <div class="row mx-auto">
                                    <div class="mx-auto">
                                        Fecha de Procesado: ${fechaProcesado.getDate()}/${parseInt(fechaProcesado.getMonth())+1}/${fechaProcesado.getFullYear()}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="mx-auto">
                                        Fecha de Entrega Estimada: ${fechaEntrega.getDate()}/${parseInt(fechaEntrega.getMonth())+1}/${fechaEntrega.getFullYear()}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="mx-auto">
                                        Referencia de Pago: ${v.referencia_pago}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="mx-auto">
                                        Productos:
                                    </div>
                                </div>
                                <hr>
                                <table class="table tablav">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>`;
                                for (const p of res.data.productos) {
                                    if(p.venta_tracking==v.tracking) {
                                        html += `
                                        <tr>
                                            <td>${p.nombre}</td>
                                            <td>${p.cantidad}</td>
                                        </tr>
                                        `;
                                    }
                                }
                                html +=`
                                </tbody>
                                </table>
                                <hr>
                                <div class="row">
                                    <div class="mx-auto">
                                        Monto: $${v.total_venta} 
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="mx-auto">
                                        Destino: ${v.destino}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            document.getElementById("VentasPanel").innerHTML = html;
        }
        
    })
    .catch(err => {
        console.error(err); 
    })
}

const token = window.localStorage.getItem('token')
