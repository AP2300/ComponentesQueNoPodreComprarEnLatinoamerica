const token = window.localStorage.getItem("token")

function LoadCartToBuy (){
    axios.get("http://localhost:3000/buy", {id:idUser}, {headers:{"auth":token}})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}