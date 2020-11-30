const db = require('../../connections/Dbconnection');

exports.userhistory = (id)=> {
  return new Promise( (resolve, reject) => {
	let msg = "";
	db.query('SELECT * FROM venta INNER JOIN carrito ON venta.carrito_id=carrito.id INNER JOIN usuarios ON carrito.id_usuario=usuarios.id WHERE usuarios.id = ?', [Number(id)], (err,res) =>{
		if(err) {
			console.log('error al solicitar ventas -->', err.stack);
			return reject('Error al solicitar ventas');
		}else{
			let products = [];
			for(let i in res){
				db.query(`SELECT detalle_venta.cantidad, producto.nombre, producto.precio FROM detalle_venta INNER JOIN producto ON detalle_venta.producto_id = producto.id WHERE venta_tracking = ? `,[res[i].tracking], (error, result) => {
					if(error) {
						console.log('error al solicitar los productos de ventas -->', error.stack);
						return reject('Error al solicitar los productos de ventas');
					}else{
						products[i] = result;
						if(i == (res.length-1)) 	return resolve({res,products});
					}
				})
			}
			return resolve({res,products})
		}
	})
  })
}

