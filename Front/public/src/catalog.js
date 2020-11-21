var productos;
var filter="";

function Loadcatalog(){
    axios.get("http://localhost:3000/catalog")
    .then(res => {
        productos = res.data.data;
        buscar(productos, filter);
    })
    .catch(err => {
        console.error(err); 
    })
}

function buscar(Data, filter){
    let text = document.getElementById("Busqueda").value.toLowerCase();
    text.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
    let reg = new RegExp(`\\b${text}`, 'i');
    let html = "";    

    for(let producto of Data){
        if(reg.test(producto.nombre)&&producto.tipo===filter&&producto.cantidad_stock>0||reg.test(producto.nombre)&&filter==="Todos"&&producto.cantidad_stock>0
        ||reg.test(producto.nombre)&&filter===""&&producto.cantidad_stock>0){
            html+=`
            <div class="col mb-4">
                <a class="product" onclick="redirect(${producto.id})" style="cursor: pointer">
                    <div class="card card-producto h-100">
                        <img src="${producto.foto}" class="card-img-top" >
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Tipo de Medicamento: ${producto.tipo}</p>
                        </div>
                        <div class="card-footer" id="catalogPage">
                            <small class="text-muted">Precio: ${producto.precio}$</small>
                        </div>
                    </div>
                </a>
            </div>`
        }
    }
    document.getElementById("productos").innerHTML=html;
}

$("ol").on("click","li", function (){
    var cat=$(this).text();
    filter=cat;
    $(".breadcrumb-item").removeClass("activo");
    $(this).toggleClass("activo");
    buscar(productos,filter);
})