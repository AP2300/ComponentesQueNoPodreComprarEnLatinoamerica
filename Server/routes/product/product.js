fs       = require("fs")
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

exports.addProductInfo = (data)=> {
  return new Promise( (resolve, reject) => {
    db.query(`INSERT INTO producto SET ?`,[data], (error, result) => {
      if(error) {
        console.log('error al crear el producto -->', error.stack);
        return reject('Error al crear el producto')
      }else{
        return resolve(result[0])
      }
    })
  })
}

exports.deleteProduct = (id)=> {
  return new Promise( (resolve, reject) => {
	let msg = "";
	db.query('SELECT foto FROM producto WHERE id = ?', [Number(id)], (err,res) =>{
		if(err) {
			console.log('error al eliminar el producto -->', error.stack);
			return reject('Error al eliminar el producto');
		}else{
			db.query(`DELETE FROM producto WHERE id = ?`,[Number(id)], (error, result) => {
				if(error) {
					console.log('error al eliminar el producto -->', error.stack);
					return reject('Error al eliminar el producto');
				}else{
					let image =`./src/img/`+res[0].foto.split("/")[4];
					fs.unlink(image, function(err) {
					if (err) {
						msg = "El Producto fue eliminado de manera exitosa"
						return resolve(msg);
					} else {
						if(result.affectedRows > 0){
							msg = "El Producto fue eliminado de manera exitosa!"
							return resolve(msg);
						}
					}
					}) 
				}
			})
		}
	})
  })
}


exports.updateProduct = (data,id)=> {
	return new Promise( (resolve, reject) => {
	db.query('SELECT foto FROM producto WHERE id = ?', [Number(id)], (err,res) =>{
		if(err) {
			console.log('error al eliminar el producto -->', error.stack);
			return reject('Error al eliminar el producto');
		}else{
			db.query(`UPDATE producto SET ? WHERE id = ?`,[data,id], (error, result) => {
				if(error) {
					console.log('error al crear el producto -->', error.stack);
					return reject('Error al crear el producto')
				}else{
					if(data.foto){
						let image =`./src/img/`+res[0].foto.split("/")[4];
						fs.unlink(image, function(err) {
							if (err) {
								let msg = "El Producto fue Editado de manera exitosa"
								return resolve(msg);
							} else {
								if(result.affectedRows > 0){
									let msg = "El Producto fue Editado de manera exitosa!"
									return resolve(msg);
								}
							}
						}) 
					}
				}
			})
		}
	})
  })
}
