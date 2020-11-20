const token = require("./../../models/token")
const register = require("./register");

module.exports.ValidateData =(req, res, next)=> {
    const dataB=req.body;
    if(!dataB.email){
        res.send({
            success:false,
            msg:"el email se encuentra vacio"
        })
    }

    if(!dataB.clave){
        res.send({
            success:false,
            msg:"la contraseña esta vacia"
        })
    }

    next();
}

module.exports.RegisterUser = (req,res)=>{
    const dataB=req.body;
    register.register(dataB)
    .then(data=>{
        
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error en registro"
        })
    })
}
