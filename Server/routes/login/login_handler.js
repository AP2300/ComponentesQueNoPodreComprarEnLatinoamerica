const token = require("./../../models/token")
const login = require("./login");

module.exports.ValidateData =(req, res, next)=> {
    if(!req.body.email){
        return res.send({
            success:false,
            msg:"el email se encuentra vacio"
        })
    }

    if(!req.body.pass){
        return res.send({
            success:false,
            msg:"la contraseña esta vacia"
        })
    }

    next();
}

module.exports.LogUser = (req,res)=>{
    login.login(req.body.email)
    .then(async (data) => {
        console.log(data);
        if(data == undefined){
            res.send({
                success:false,
                msg:"este usuario no existe"
            })
        }else{
            await bcrypt.compare(req.body.pass, data.clave, (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    const payLoad = {
                        id: id,
                        email: email,
                    }
                    
                    token.signToken(payLoad)
                    .then(token =>{
                        console.log(token);

                        res.send({
                            success: true,
                            token:token,
                            msg: "Bienvenido"
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.send({
                            success:false,
                            msg: "Error en el login"
                        })
                    })
                }
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error en login"
        })
    })
}