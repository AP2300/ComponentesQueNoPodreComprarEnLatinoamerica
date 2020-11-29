const token = window.localStorage.getItem("token")

async function LoadCartToBuy (){
    console.log(idUser);
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

setTimeout(LoadCartToBuy,2000)