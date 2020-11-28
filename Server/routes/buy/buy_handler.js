const buy = require("./buy");

module.exports.GetBuyDetails = (req,res)=>{
    buy.GetData()
    .then(data=>{
        if(data==null){
            res.send({
                success:false,
                msg: "error al recuperar los productos"
            })
        }else{
            res.send({
                success:true,
                msg: "productos encontrados exitosamente"
            })
        }
    })
}