const token = window.localStorage.getItem('token')

function loadhistory(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    console.log('esperando')
    axios.get("http://localhost:3000/userhistory", {headers: {'auth':token},params:{id:Id}})
    .then(res => {
        let html = '';
        let venta = res.data.data.res
        let products = res.data.data.products
        for(let v in venta){
            html +=`
            <div class="card comentarios center">
                <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${v}" >
                    <div class="row center">
                        <div class="col-sm">
                            #Orden : ${venta[v].tracking} 
                        </div>
                        <div class="col-sm">
                            Procesado: ${venta[v].fecha_procesado.split('T')[0]}
                        </div>    
                        <div class="col-sm">
                            Total: ${venta[v].total_venta}
                        </div>                                      
                    </div>
                    </button>
                </h2>
                </div>
                <div id="collapse${v}" class="collapse" >
                <div class="card-body ">
                    <div class="row justify-content-center ">
                        <div class="col-sm">
                            Fecha de Entrega Estimada: ${venta[v].fecha_entrega.split('T')[0]}
                        </div>
                    </div>
                    <hr>
                    <div class="row justify-content-center ">
                        <div class="col-sm">
                            Destino: ${venta[v].destino}
                        </div>
                    </div>
                    <hr>
                        <div class="row justify-content-center ">
                            <div class="col-sm">
                                Referencia de Pago: ${venta[v].referencia_pago} 
                            </div>
                        </div>
                    <hr>
                    <div class="row justify-content-center" id="products${v}">
                        
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById('accordion').innerHTML = html;                
        addproduct(products);
    })
    .catch(err => {
        console.error(err); 
    })
}

function addproduct(data){
    for(let d in data){
        let inner = '';
        for (let p in data[d]){
            inner+=`
            <div class="row w-100">
            <div class="col-md-4">
                Producto: ${data[d][p].nombre} 
            </div>
            <div class="col-md-4">
                Cantidad: ${data[d][p].cantidad}
            </div>
            <div class="col-md-4">
                Precio: ${data[d][p].precio}
            </div>
            </div>
            `;
            if(p != (data[d].length-1)){
                inner += `<hr class="w-100">`
            }
        }
        document.getElementById(`products${d}`).innerHTML = inner;
    }
}