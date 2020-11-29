function LoadData (){
    axios.get("http://localhost:3000/index")
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}


const token = window.localStorage.getItem('token')


