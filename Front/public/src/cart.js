const token = window.localStorage.getItem('token')

if(!token){
    window.location.href = './login.html'
}else {
    document.getElementById("insert").innerHTML=""
    document.getElementById("insert").innerHTML=`<li class="nav-item" id="usernav">
    <a class="nav-link hover" href="#" id="username"><i class="fas fa-user"></i></a>
</li>`
}

function ShowCart(){
    let id = window.location.search
    let urlId = new URLSearchParams(id)
    let Id = urlId.get("id")
    console.log(Id)
    axios.get("http://localhost:3000/cart", {params:{ id:Id},headers: {'auth':token}})
    .then(res => {
        console.log(res.data.data)
        var html = "";

        for(let o of res.data.data){
            html+=`
            <tr>
                <th scope="row" class="border-0">
                    <div class="p-2">
                    <img src="${o.data.foto}" alt="" width="70" class="img-fluid rounded shadow-sm">
                    <div class="ml-3 d-inline-block align-middle">
                        <h5 class="mb-0"> <a href="/Front/product.html?id=${o.data.id}" class="text-dark d-inline-block align-middle">${o.data.nombre}</a></h5>
                    </div>
                    </div>
                </th>
                <td class="border-0 align-middle"><strong>$${o.data.precio}</strong></td>
                <td class="border-0 align-middle"> <form action="/UpdateCart" method="POST" class="addForm" id="CartForm${o.data.id}">
                    <input type="number" class="addInput" value="${o.cantidad}" name="cantidad" id="Qtty${o.data.id}" min="1" onchange="SubmitCartForm('CartForm${o.data.id}')">
                    <input type="number" value="${o.data.id}" name="id" class="invisible">
                    <input type="number" value="${o.data.id}" class="invisible" name="idProducto">
                    <input type="number" value="${String(window.location.search).charAt(4)}" name="UsrId" class="invisible">
                </form></td>
                <form action="/DeleteFromCart" method="POST" class="addForm" id="DelForm${o.data.id}">
                    <input type="number" value="${o.data.id}" name="id" class="invisible">
                    <input type="number" value="${String(window.location.search).charAt(4)}" name="UsrId" class="invisible">
                </form>
                <td class="border-0 align-middle"><a href="#" class="text-dark" onclick="SubmitDelete('DelForm${o.data.id}')"><i class="fa fa-trash"></i></a></td>
            </tr>
            `
            document.getElementById("load").style.display = "none"
        }

        document.getElementById("cartList").innerHTML = html;
    })
    .catch(err => {
        console.error(err); 
    })
}