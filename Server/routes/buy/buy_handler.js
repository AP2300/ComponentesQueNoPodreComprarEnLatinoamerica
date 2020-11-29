const buy = require("./buy");


module.exports.GetBuyDetails = (req,res)=>{
    buy.GetData(req.query.id)
    .then(data=>{
        if(data==null){

            res.send({
                success:false,
                msg: "error al recuperar los productos"
            })
        }else{

            res.send({
                success:true,
                msg: "productos encontrados exitosamente",
                data:data
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "error al recuperar los datos"
        })
    })
}

module.exports.MakeBuy = (req,res)=>{
    const data = req.body;
    buy.SetData(data.id,data.Fentrega, data.Fsalida, data.addrs, data.discount, data.total)
    .then(data=>{
        res.send({
            success:true,
            msg:data
        })
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "error al consultar la base de datos"
        })
    })
}