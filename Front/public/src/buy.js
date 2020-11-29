const token = window.localStorage.getItem("token")

function LoadCartToBuy (){
    axios.get("http://localhost:3000/buy", {headers:{"auth":token}, params:{id:idUser}})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}