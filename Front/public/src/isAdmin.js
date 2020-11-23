async function isAdmin() {
    const token = window.localStorage.getItem('token')
    
    if(token == null) {
      return false;
    }else{
        await axios.get('http://localhost:3000/user', {
            'headers': {'auth':token}
        })
        .then(function (response){
            if(response.data.log===true&&response.data.admin===true){
                console.log(true);
                return true;
            } else return false;
        })
        .catch(function(err) {
            console.log(err)
        })
    
    }
}
