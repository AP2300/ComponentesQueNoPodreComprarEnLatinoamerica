const db = require('../../connections/Dbconnection');

exports.sales = function() {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT venta.*, usuarios.email FROM carrito INNER JOIN venta ON venta.carrito_id=carrito.id INNER JOIN usuarios ON usuarios.id=carrito.id_usuario`, (error, result) => {
      if(error) {
        console.log('error al cargar las ventas -->', error.stack);
        return reject('Error al cargar las ventas')
      }
      if (result.length <= 0) {
        return reject("No hay ventas para mostrar");
      } else {
        let detalles = result;
        db.query(`SELECT producto.nombre, detalle_venta.venta_tracking, detalle_venta.cantidad FROM producto INNER JOIN detalle_venta ON detalle_venta.producto_id=producto.id`, (error, result) => {
          if(error) {
            console.log('error al cargar las ventas -->', error.stack);
            return reject('Error al Cargar las ventas')
          }
          resolve([detalles, result]);
        })
      }
      
    })
  })
}