const db = require('./../../connections/Dbconnection');

exports.login = function(email) {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT id, email, clave
    FROM cliente
    WHERE email = ?`,[email], (error, result) => {

      if(error) {
        console.log('error en el login', error.stack);
        return reject('Error en el login')
      }
      console.log(result[0]);
      resolve(result[0]);

    })
  })
}