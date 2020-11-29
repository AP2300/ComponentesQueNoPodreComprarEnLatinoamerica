const db = require("./../../connections/Dbconnection");
var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister();

exports.GetData = (id)=>{
    return new Promise ((resolve, reject)=>{
        db.query("SELECT * FROM carrito WHERE id_usuario = ? ",[id], (err, result1)=>{
            if(err){
                console.log(err);
                reject("error al consultar el carrito")
            }else{
                db.query(`SELECT carrito_has_producto.*, producto.* FROM carrito_has_producto INNER JOIN producto 
                ON carrito_has_producto.producto_id=producto.id WHERE carrito_has_producto.carrito_id= ? `,[result1[0].id],(err, result2)=>{
                    if(err) {
                        console.log(err);
                        reject("error al recuperar la informacion de los productos")
                    }else{
                        resolve(result2)
                    }
                })
            }
        })
    })
}

exports.SetData = (id,Fentrega, Fsalida, addrs, discount, total)=>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT carrito.*, carrito_has_producto.producto_id,carrito_has_producto.cantidad 
        FROM carrito INNER JOIN carrito_has_producto 
        ON carrito.id=carrito_has_producto.carrito_id 
        WHERE carrito.id_usuario = ?`,[id],(err, result1)=>{
            if(err){
                console.log(err);
                reject("Error al comprobar la orden del usuario")
            }else{
                const tracking = generator.random_int(10);
                db.query("INSERT INTO venta SET ?",[{
                    tracking:tracking, 
                    fecha_procesado:Fsalida, 
                    fecha_entrega:Fentrega, 
                    destino:addrs, 
                    referencia_pago:generator.random_int(10),
                    descuento:discount,
                    total_venta:total, 
                    carrito_id:result1[0].id
                }], (err, result2)=>{
                    if(err){
                        console.log(err);
                        reject("Error al procesar la venta")
                    }else{
                        for (const i in result1) {
                            db.query("INSERT INTO detalle_venta SET ? ",[{
                                venta_tracking:tracking, 
                                producto_id:result1[i].producto_id,
                                cantidad:result1[i].cantidad
                            }], (err, result3)=>{
                                if(err){
                                    console.log(err);
                                    reject("Error al crear el detalle de venta")
                                }else{
                                    console.log("hola");
                                    db.query(`UPDATE producto 
                                    SET cantidad_stock = cantidad_stock - ${result1[i].cantidad} 
                                    WHERE id= ?`, [result1[i].producto_id], (err, result4)=>{
                                        if(err){
                                            console.log(err);
                                            reject("Error al realizar la venta")
                                        }
                                    })
                                }
                            })
                        }
                        db.query("DELETE FROM carrito_has_producto WHERE carrito_id = ?", [result1[0].id], (err, result5)=>{
                            if(err){
                                console.log(err);
                                reject("Error al actualizar el carrito")
                            }else{
                                resolve("Compra exitosa")
                            }
                        })
                    }
                })
            }
        })
    })
}