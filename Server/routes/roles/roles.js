const db = require('../../connections/Dbconnection');

exports.roles = function() {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT * FROM roles`, (error, result) => {
      if(error) {
        console.log('error al cargar los roles -->', error.stack);
        return reject('Error al Cargar los roles')
      }
      resolve(result);
    })
  })
}