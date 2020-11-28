const db = require("./../../connections/Dbconnection");

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