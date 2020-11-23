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