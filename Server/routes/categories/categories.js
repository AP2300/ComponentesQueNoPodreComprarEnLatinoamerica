const db = require('../../connections/Dbconnection');

exports.categories = function() {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT * FROM categoria`, (error, result) => {
      if(error) {
        console.log('error al cargar las categorias -->', error.stack);
        return reject('Error al Cargar las categorias')
      }
      resolve(result);
    })
  })
}