const db = require('../../connections/Dbconnection');

exports.product = (id)=> {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT producto.*, categoria.nombre AS categoria_nombre FROM producto 
    INNER JOIN categoria ON categoria.id = producto.categoria_id WHERE producto.id = ?`,[Number(id)], (error, result) => {
      if(error) {
        console.log('error al cargar el producto  1 -->', error.stack);
        return reject('Error al Cargar el producto')
      }else{
        return resolve(result[0])
      }
    })
  })
}