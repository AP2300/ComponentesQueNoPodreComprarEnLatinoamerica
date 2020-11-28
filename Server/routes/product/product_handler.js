const product = require("./product");

module.exports.ShowProduct = (req,res)=>{
    let query = req.query.id
    product.product(query)
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"En catalogo no hay nada"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"Producto encontrado exitosamente"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error al cargar el producto"
        })
    })
}

module.exports.DeleteProduct = (req,res)=>{
    let query = req.query.id
    product.deleteProduct(query)
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"Hubo un problema al Eliminar el producto"
            })
        }else{
            res.send({
                success:true,
                msg:data
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error al eliminar el producto"
        })
    })
}