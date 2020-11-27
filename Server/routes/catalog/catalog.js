const db = require('../../connections/Dbconnection');

exports.catalog = function() {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT producto.*, categoria.nombre AS categoria
    FROM producto INNER JOIN categoria ON producto.categoria_id = categoria.id`, (error, result) => {
      if(error) {
        console.log('error al cargar el catalog -->', error.stack);
        return reject('Error al Cargar el Catalogo')
      }
      resolve(result);
    })
  })
}