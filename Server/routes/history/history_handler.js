const history = require("./history")

module.exports.ShowHistory = (req,res)=>{
    let query = req.query.id
    history.userhistory(query)
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"No ha Hecho ninguna Compra en nuestro Sistema"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"Aqui estan las ventas del Usuario"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error al cargar el Historial"
        })
    })
}