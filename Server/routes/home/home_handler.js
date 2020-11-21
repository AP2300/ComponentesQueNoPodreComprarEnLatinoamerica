const home = require("./home");

module.exports.GetRecomendedData =(req,res,next)=>{
    home.recomended()
    .then(data=>{
        res.send({
            data:data
        })
    })
}