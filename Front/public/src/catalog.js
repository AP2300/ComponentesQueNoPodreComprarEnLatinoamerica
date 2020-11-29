var productos;
var filter="";

const token = window.localStorage.getItem('token')

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
        if(reg.test(producto.nombre)&&producto.categoria===filter&&producto.cantidad_stock>0||reg.test(producto.nombre)&&filter==="Todos"&&producto.cantidad_stock>0
        ||reg.test(producto.nombre)&&filter===""&&producto.cantidad_stock>0){
            html+=`
            <div class="col mb-4">
                <a class="product" onclick="redirect(${producto.id})" style="cursor: pointer">
                    <div class="card card-producto h-100">
                        <img src="${producto.foto}" class="card-img-top" >
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Categoria: ${producto.categoria}</p>
                        </div>
                        </a>
                        <div class="card-footer" id="catalogPage${producto.id}">
                            <small class="text-muted">Precio: ${producto.precio}$</small>
                        </div>
                    </div>
            </div>`
        }
    }
    document.getElementById("productos").innerHTML=html;
    Admin(filter,reg);
}

async function Admin(filter, reg) {
    if(isAdmin()){
        for(let producto of productos){
            if(reg.test(producto.nombre)&&producto.categoria===filter&&producto.cantidad_stock>0||reg.test(producto.nombre)&&filter==="Todos"&&producto.cantidad_stock>0
            ||reg.test(producto.nombre)&&filter===""&&producto.cantidad_stock>0){
                document.getElementById(`catalogPage${producto.id}`).innerHTML += `<br>
                <span class="btn btns btn-alert mt-2" role="button" id="edit" onclick="editarProducto(${producto.id})"><i class="far fa-edit"></i></span>
                <span class="btn btns mt-2" type="" onclick="borrarProducto(${producto.id})" id="boton"><i class="far fa-trash-alt"></i></span>`;
            }
        } 
    }
}

function borrarProducto(id) {
    var res = confirm("Está seguro de que desea eliminar el producto?");

    if(res) {
        console.log(`eliminado ${id}`);
        axios.post("http://localhost:3000/deleteproduct", null,{headers: {'auth':token},params:{id:id}})
        .then(res => {
            alert(res.data.msg);
            window.location.href="catalog.html";
        })
        .catch(err => {
            alert(err.data.msg);
            console.error(err); 
        })
    }
}

function editarProducto(id) {
    window.location.href = `EditProduct.html?id=`+id;
}

$("ol").on("click","li", function (){
    var cat=$(this).text();
    console.log(cat);
    filter=cat;
    $(".breadcrumb-item").removeClass("activo");
    $(this).toggleClass("activo");
    buscar(productos,filter);
})

function redirect(data){
    window.location.href="product.html?id="+data;
}

