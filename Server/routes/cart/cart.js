const DB = require('../../connections/Dbconnection');

exports.addproduct = function(req) {
  return new Promise( (resolve, reject) => {
    let key;
    
    DB.query("SELECT cantidad FROM carrito_has_producto WHERE producto_id= ?",[req.body.ID], (err, results)=>{
        if(err){
          console.log('error al pedir la cantidad del producto a agregar -->', err.stack);
          return reject('Error al Agregar el Producto');
        }else{
            if(results.length<1){
                DB.query("SELECT carrito_id FROM cliente WHERE email= ?", [req.body.correo], (err,results1)=>{
                    if(err){
					  console.log('error al solicitar el id del usuario -->', err.stack);
					  return reject('Error al Solicitar id_Usuario');
                    } 
					else{
						DB.query("INSERT INTO carrito_has_producto SET ?",{carrito_id:results1[0].carrito_id,producto_id:req.body.ID,cantidad:Number(req.body.cantidad)}, (err, res)=>{
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
        DB.query("SELECT id FROM carrito WHERE id_cliente = ?",[id], async (err, res)=>{
            if(err){ 
                console.log('error al mostrar el carrito -->', err.stack);
                return reject('Error al mostrar el carrito');
            }else{
                DB.query("SELECT producto_id,cantidad FROM carrito_has_producto WHERE carrito_id = ?",[res[0].id], async (err, results)=>{
                    if(results.length>0){
                        for (let i in results) {
                            let query = DB.query("SELECT * FROM producto WHERE id = ?", [results[i].producto_id])
                            query.on("result",async (row)=> {
                                CartInfo[i] = {data:row, cantidad:results[i].cantidad, id:results[i].producto_id};
                            })
                            query.on("end",()=>{
                                if(parseInt(i) == (results.length-1)){
                                    console.log("aqui fue")
                                    return resolve(CartInfo);
                                }
                            })
                            console.log(i);
                        }
                    }else{
                        return resolve('No hay Productos en el carrito');
                    }
                })
            }
        })
    })
}

