const cart = require("./cart");

module.exports.addProduct = (req,res)=>{
    console.log(req.body)
    cart.cart(req)
    .then(async (data) => {
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