const DB = require('../../connections/Dbconnection');
let idCart;


exports.addproduct = function(req) {
  return new Promise( (resolve, reject) => {
    let key;
    DB.query("SELECT id FROM carrito WHERE id_usuario = ?", [req.body.id],(err, resultC)=>{
        if(err){
            console.log(err);
            reject("error al consultar el carrito")
        }else{
            idCart=resultC[0].id;
        }
    })
    
    DB.query("SELECT cantidad FROM carrito_has_producto WHERE producto_id= ? AND carrito_id = ?",[req.body.ID, idCart], (err, results)=>{
        if(err){
          console.log('error al pedir la cantidad del producto a agregar -->', err.stack);
          return reject('Error al Agregar el Producto');
        }else{
            if(results.length<1){
                DB.query("SELECT id FROM carrito WHERE id_usuario= ?", [req.body.id], (err,results1)=>{
                    if(err){
					  console.log('error al solicitar el id del usuario -->', err.stack);
					  return reject('Error al Solicitar id_Usuario');
                    } 
					else{
						DB.query("INSERT INTO carrito_has_producto SET ?",{carrito_id:results1[0].id,producto_id:req.body.ID,cantidad:Number(req.body.cantidad)}, (err, res)=>{
							if(err){
								console.log('error al insertar el producto en el carrito -->', err.stack);
								return reject('Error al Insertar el Producto');
							}
							else{
								resolve(res);
							}
						}) 
                    }
                })
            }else{
                key = Number(results[0].cantidad)+Number(req.body.cantidad);
                DB.query("UPDATE carrito_has_producto SET ? WHERE producto_id = ?",[{cantidad:key}, req.body.ID], (err, result)=>{
                    if(err){
						console.log('error al actualizar la cantidad del producto -->', err.stack);
						return reject('Error al Actualizar el Producto');
                    }else{
						resolve(result);
                    }
                })
            }
        }
    })
  })
}

exports.Showcart = (id)=>{
    let CartInfo = [];

    return new Promise( (resolve, reject) => {
        DB.query("SELECT id FROM carrito WHERE id_usuario = ?",[id], async (err, res)=>{
            if(err){ 
                console.log('error al mostrar el carrito -->', err.stack);
                return reject('Error al mostrar el carrito');
            }else{
                idCart=res[0].id
                DB.query("SELECT producto_id,cantidad FROM carrito_has_producto WHERE carrito_id = ?",[res[0].id], async (err, results)=>{
                    if(results.length>0){
                        for (let i in results) {
                            let query = DB.query("SELECT * FROM producto WHERE id = ?", [results[i].producto_id])
                            query.on("result",async (row)=> {
                                CartInfo[i] = {data:row, cantidad:results[i].cantidad, id:results[i].producto_id};
                                console.log(row);
                                console.log(results[i]);
                            })
                            query.on("end",()=>{
                                if(parseInt(i) == (results.length-1)){
                                    return resolve(CartInfo);
                                }
                            })
                        }
                    }else{
                        return reject('No hay Productos en el carrito');
                    }
                })
            }
        })
    })
}

exports.UpdateCart = (qtty, id)=>{
    return new Promise((resolve,reject)=>{
        console.log(id);
        DB.query(`SELECT cantidad FROM carrito_has_producto WHERE carrito_id = ? AND producto_id = ?`,[idCart,id], (err, result)=>{
            if(err){
                console.log(err);
                reject("error al consultar el carrito")
            }else{
                DB.query(`UPDATE carrito_has_producto SET cantidad = ? 
                WHERE producto_id = ? AND carrito_id = ?`,[qtty,id,idCart], (err, result)=>{
                    if(err){
                        console.log(err);
                        reject("error al actualizar el carrito")
                    }else{
                        resolve("carrito actualizado correctamente")
                    }
                })
            }
        })
    })
}

exports.DelCart = (id)=>{
    return new Promise ((resolve, reject)=>{
        DB.query(`DELETE FROM carrito_has_producto WHERE producto_id = ? AND carrito_id = ?`,[id,idCart], (err, result)=>{
            if(err){
                console.log(err);
                return reject("Error al eliminar del carrito")
            }else{
                console.log(result);
                return resolve("Producto eliminado del carrito exitosamente")
            }
        })
    })
}