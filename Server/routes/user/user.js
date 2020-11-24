const db = require('./../../connections/Dbconnection');

exports.user = function(id) {
    return new Promise( (resolve, reject) => {
      db.query('SELECT nombre, email FROM cliente WHERE id = ?',[id], (error, result) => {
  
        if(error) {
          console.log('error en obtener data', error.stack);
          return reject('Error')
        }
  
        resolve(result[0]);
  
      })
    })
  }