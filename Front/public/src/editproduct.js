function LoadInformation(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    axios.get("http://localhost:3000/product", {params:{ id:Id}})
    .then(res => {
        let data=res.data.data;
        let dataArr=data.descripcion.split(";")
        for (const i in dataArr) {
            document.getElementById(`label${i}`).innerText = `${dataArr[i].split(":")[0]}`
            document.getElementById(`Description${i}`).value = `${dataArr[i].split(":")[1]}`
        }
        console.log(data.categoria_nombre)
        document.getElementById(`inputMedName`).value =data.nombre;
        document.getElementById(`inputMedmarca`).value =data.marca;
        document.getElementById("inputPrice").value = data.precio;
        document.getElementById("inputType").value = data.categoria_id;
        document.getElementById("inputQuantity").value = data.cantidad_stock;

    })
    .catch(err => {
        console.error(err); 
    })
}

function EditProduct(){
    let ID = window.location.search
    let urlId = new URLSearchParams(ID)
    let id = urlId.get("id")
    console.log(id);
    let dataArr = "";
    for (let i = 0; i < 6; i++ ) {
        dataArr += document.getElementById(`label${i}`).innerText + ':' + document.getElementById(`Description${i}`).value;
        if(i<5){
            dataArr += ';';
        }  
    }

    let name = document.getElementById(`inputMedName`).value;
    let marca = document.getElementById(`inputMedmarca`).value;
    let precio = document.getElementById("inputPrice").value;
    let categoria = document.getElementById("inputType").value;
    let cantidad = document.getElementById("inputQuantity").value;
    let img = document.getElementById('CustomFile').files[0];
    let notchange = document.getElementById('checking').checked;

    if (validData(notchange)){
        return null;
    }
    
    var formData = new FormData();
    formData.append("nombre",name);
    formData.append("precio",precio);
    formData.append("marca",marca);
    formData.append("categoria_id", categoria);
    formData.append("cantidad_stock", cantidad);
    formData.append("foto",img);
    formData.append("descripcion",dataArr);
    formData.append("notchange",notchange);
    console.log(notchange);

    axios.post("http://localhost:3000/updateproduct", formData ,{headers: {'auth':token,'Content-Type': 'multipart/form-data'},params:{id:id}})
    .then(info => {
        alert(info.data.msg);
        window.location.href="catalog.html";
    })
    .catch(err => {
        console.error(err); 
    })
    
}

function validData(check){
    if(document.getElementById(`inputMedName`).value == ""){
        alert('El Nombre esta vacio');
        return true;
    }
    if(document.getElementById(`inputMedmarca`).value == ""){
        alert('La Marca esta vacia');
        return true;
    }
    if(document.getElementById(`inputPrice`).value == ""){
        alert('El Precio esta vacio');
        return true;
    }
    if(document.getElementById(`inputQuantity`).value == ""){
        alert('La Cantidad esta vacia');
        return true;
    }
    if(!document.getElementById('CustomFile').files[0]){
        if(!check){
            alert('No ha subido ninguna imagen para Cambiar');
            return true;
        }
    }
    return false;
}

function handleChange(obj) {
    if(obj.checked == true){
        document.getElementById("CustomFile").setAttribute("disabled", "disabled");
    }else{
        document.getElementById("CustomFile").removeAttribute("disabled");
   }
}

const token = window.localStorage.getItem('token')

function changetype(value){
    switch (Number(value)) {
        case 1:
            for(let i=0;i<6;i++){
                document.getElementById(`label${i}`).innerText = type[1][i];
                document.getElementById(`Description${i}`).value = ""
            }
        break;

        case 2:
            for(let i=0;i<6;i++){
                document.getElementById(`label${i}`).innerText = type[2][i];
                document.getElementById(`Description${i}`).value = ""
            }
        break;

        case 3:
            for(let i=0;i<6;i++){
                document.getElementById(`label${i}`).innerText = type[3][i];
                document.getElementById(`Description${i}`).value = ""
            }
        break;

        case 4:
            for(let i=0;i<6;i++){
                document.getElementById(`label${i}`).innerText = type[4][i];
                document.getElementById(`Description${i}`).value = ""
            }
        break;

        case 5:
            for(let i=0;i<6;i++){
                document.getElementById(`label${i}`).innerText = type[5][i];
                document.getElementById(`Description${i}`).value = ""
            }
        break;

        case 6:
            for(let i=0;i<6;i++){
                document.getElementById(`label${i}`).innerText = type[6][i];
                document.getElementById(`Description${i}`).value = ""
            }
        break;
    
        case 7:
            for(let i=0;i<6;i++){
                document.getElementById(`label${i}`).innerText = type[7][i];
                document.getElementById(`Description${i}`).value = ""
            }
        break;

        default:
            alert('Hubo un error al cambiar el Tipo');
        break;
    }
}

$('#CustomFile').on('change',function(){
    var fileName = $(this).val();
    $(this).next('.custom-file-label').html(fileName.replace('C:\\fakepath\\', " "));
})

type = [
    [],
    ['Frecuencia','Frecuencia máxima','Nucleos/Hilos','TDP','Socket','Ram Permitida'],
    ['Frecuencia','Tipo','Capacidad','Latencias','ECC','RGB'],
    ['Socket','Chipset','Tipo y Slots de Ram','Puertos PCIe','Memoria Maxima','Factor de Forma'],
    ['Frecuencia','Frecuencia Boost','Ram de Video','Version del PCIe','Resolucion Máxima Admitida','Conexiones de video'],
    ['Capacidad','Factor de Forma','Interfaz','Dimensiones (Largo, Ancho y Alto)','Rendimiento de Lectura Secuencial','Rendimiento de Escritura Secuencial'],
    ['Potencia','Certificacion','Modularidad','Factor de Forma','Salida Unica de 12V:','Modo 0 RPM'],
    ['Factor de Forma','Ventiladores Incluidos','Puertos I/O','Cantidad de Bahias de Radiador','Cantidad de Bahias de Almacenamiento','Cantidad de Bahias de Ventilador'],
]
