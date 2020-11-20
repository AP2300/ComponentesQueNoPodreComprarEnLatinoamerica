const token = require("./../../models/token")
const register = require("./register");

module.exports.ValidateData =(req, res, next)=> {
    if(!req.body.email){
        res.send({
            success:false,
            msg:"el email se encuentra vacio"
        })
    }

    if(!req.body.pass){
        res.send({
            success:false,
            msg:"la contraseña esta vacia"
        })
    }

    next();
}

module.exports.RegisterUser = (req,res)=>{
    register.register(data)
    .then(data=>{
        console.log(data);
    })
}
