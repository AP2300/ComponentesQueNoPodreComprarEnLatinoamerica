const db = require('./../../connections/Dbconnection');
const bcrypt = require("bcryptjs");

exports.user = function(id) {
    return new Promise( (resolve, reject) => {
      db.query('SELECT nombre, email FROM client WHERE id = ?',[id], (error, result) => {
  
        if(error) {
          console.log('error en obtener data', error.stack);
          return reject('Error')
        }
  
        resolve(result[0]);
  
      })
    })
  }