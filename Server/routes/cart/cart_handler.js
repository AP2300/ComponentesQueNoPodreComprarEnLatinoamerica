const cart = require("./cart");

module.exports.addProduct = (req,res)=>{
    console.log(req.body)
    cart.addproduct(req)
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"No se Agrego el producto"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"El producto fue agregado satisfactoriamente"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error Fatal al insertar el Producto"
        })
    })
}

module.exports.Showcart = (req,res)=>{
    cart.Showcart(req.query.id)
    .then(async (data) => {
        console.log(data);
        if(data == undefined){
            res.send({
                success:false,
                msg:"En el Carrito no hay nada"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"Aqui esta el carrito del usuario"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error Fatal al cargar el Producto"
        })
    })
}

module.exports.UpdateCart = (req,res)=>{
    const data = req.body
    cart.UpdateCart(data.cantidad, data.idProducto)
    .then(data=>{
        res.send({
            success: true,
            msg: "carrito actualizado"
        })
    })
}