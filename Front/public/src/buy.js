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
        if(res.data.success=true){
            document.getElementById("body").innerHTML += `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${res.data.msg}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>`
            setTimeout(()=>{window.location.href="index.html"},3000)
        }else{
            document.getElementById("body").innerHTML += `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${res.data.msg}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

function ValidateData() {
    if(!document.getElementById("NombreTarjeta").value){
        return alert("El nombre del tarjetahabiente no puede estar vacio")
    }else if(document.getElementById("TypeSelect").value==="Elegir..."){
        return alert("Debe seleccionar el tipo de tarjeta")
    }else if(!document.getElementById("NumeroTarjeta").value){
        return alert("Debe ingresar un numero de tarjeta")
    }else if(!document.getElementById("Fvencimiento").value){
        return alert("Debe ingresar la fecha de vencimiento de su tarjeta")
    }else if(!document.getElementById("CVV").value){
        return alert("Debe introducir un cvv")
    }else if(!document.getElementById("ZIP").value){
        return alert("Debe introducir un codigo postal")
    }else if(!document.getElementById("address").value){
        return alert("Debe introducir una direccion de envio")
    }else{
        MakeBuyF()
    }
}
