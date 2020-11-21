const db = require('../../connections/Dbconnection');

exports.catalog = function() {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT *
    FROM producto`, (error, result) => {
      if(error) {
        console.log('error al cargar el catalog -->', error.stack);
        return reject('Error al Cargar el Catalogo')
      }
      resolve(result);
    })
  })
}