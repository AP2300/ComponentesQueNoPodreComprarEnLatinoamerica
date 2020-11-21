function validSession() {
    const token = window.localStorage.getItem('token')
    
    if(token == null) {
      window.location.href = '../login.html'
    }
    else {
      axios.get('http://localhost:3000/user', {
        'headers': {'auth':token}
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function(err) {
        console.log(err)
      })
  
    }
}

function getSession(){
    const token = window.localStorage.getItem('token')
    if(window.location.href.split("/")[4]!==""||window.location.href.split("/")[4]!=="catalog.html"
    ||window.location.href.split("/")[4]!=="product.html"){
        validSession()
    }
}