const home = require("./home");

module.exports.GetRecomendedData =(req,res,next)=>{
    home.recomended()
    .then(data=>{
        res.send({
            success:true,
            data:data
        })
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error al recuperar la informacion"
        })
    })
}