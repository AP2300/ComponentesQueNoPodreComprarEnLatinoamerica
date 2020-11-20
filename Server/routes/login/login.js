const db = require('../../config/connection');

exports.login = function(email) {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT id, email, clave
    FROM users
    WHERE email = ?`,[email], (error, result) => {

      if(error) {
        console.log('error en el login', error.stack);
        return reject('Error en el login')
      }

      resolve(result[0]);

    })
  })
}