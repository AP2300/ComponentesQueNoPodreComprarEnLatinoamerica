const token = window.localStorage.getItem("token")

async function LoadCartToBuy (){
    axios.get("http://localhost:3000/buy", {params:{id:idUser}, headers:{"auth":token}})
    .then(async (res) => {
        const data = res.data.data;
        let temp=""
        let subTotal=0;
        let Total=0;
        if(data!=undefined){
            for (const i in data) {
                temp+=`<tr>
                <td scope="col">${data[i].nombre}</td>
                <td scope="col">${data[i].cantidad}</td>
                <td scope="col">${data[i].precio}</td>
            </tr>`
            subTotal=subTotal+Number(data[i].precio*data[i].cantidad);
            }
        }
        document.getElementById("insertT").innerHTML=temp;
        document.getElementById("subTotalPrice").innerText= "$"+subTotal.toFixed(2)
        document.getElementById("discount").innerText = "15%"
        Total = subTotal-(subTotal*0.15);
        document.getElementById("TotalPrice").innerText = "$"+Total.toFixed(2)
    })
    .catch(err => {
        console.error(err); 
    })
}

setTimeout(LoadCartToBuy,2000);

function MakeBuyF (){
    const adrss = document.getElementById("address").value;
    const date = new Date();
    const fechaT =`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const date2 = new Date(Date.now()+1000*60*60*24*14)
    const fechaS = `${date2.getFullYear()}-${date2.getMonth()+1}-${date2.getDate()}`
    const discnt = document.getElementById("discount").innerText.replace("%","");
    const total = document.getElementById("TotalPrice").innerText.replace("$","");


    axios.post("http://localhost:3000/MakeBuy",{id:idUser,Fentrega:fechaS,Fsalida:fechaT,addrs:adrss,discount:discnt, total:total},{headers:{"auth":token}})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}

if(!token){
    document.getElementById("insert").innerHTML= `<li class="nav-item" id="usuarionav">
    <a class="nav-link hover" href="/Front/login.html"><i class="fas fa-user"></i> Iniciar sesión</a>
  </li>
  <li class="nav-item" id="registranav">
      <a class="nav-link hover" href="/Front/register.html"><i class="fas fa-user"></i> Registrarse</a>
  </li>`
}else{
    document.getElementById("insert").innerHTML=""
    document.getElementById("insert").innerHTML=`<span tabindex="0"  data-toggle="popover" data-trigger="focus" data-placement="bottom"  id="username"><i class="fas fa-user"></i> </span>
    <a href="#" onclick="goCart()"><i class="fas fa-shopping-cart"></i></a>`

    if(isAdmin()) {
        var options = `<a class="nav-link hover" href="/Front/admin.html"><i class="fas fa-user-cog"></i> Panel Administrativo</a>
        <a class="nav-link hover" href="#" id="CloseSession"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`
    } else {
        var options = `<a class="nav-link hover" href="#" id="CloseSession"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`;
    }

    $(document).ready(function () {
        $('[data-toggle="popover"]').popover({
            trigger: "click",
            html: true,
            content: options
        })
    })
}