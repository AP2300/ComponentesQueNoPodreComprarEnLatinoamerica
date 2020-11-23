const token = require("./../../models/token")
const login = require("./login");
const bcrypt = require("bcryptjs");


module.exports.ValidateData =(req, res, next)=> {

    if(!req.body.email){
        return res.send({
            success:false,
            msg:"el email se encuentra vacio"
        })
    }

    if(!req.body.clave){
        return res.send({
            success:false,
            msg:"la contraseña esta vacia"
        })
    }

    next();
}

module.exports.LogUser = (req,res)=>{
    console.log(req.body);

    if(req.body.email=="jesusenrique-r-p@hotmail.com") var admin = true;
    else var admin = false

    console.log(admin);

    login.login(req.body.email)
    .then(async (data) => {
        console.log("log del then ==>"+data);
        if(data == undefined){
            res.send({
                success:false,
                msg:"este usuario no existe"
            })
        }else{
            bcrypt.compare(req.body.clave, data.clave, (err,result)=>{
                if(err){
                    console.log(err);
                }else if(result){
                    const payLoad = {
                        id: data.id,
                        email: data.email,
                        admin: admin
                    }
                    
                    token.signToken(payLoad)
                    .then(token =>{
                        console.log(token);

                        res.send({
                            success: true,
                            token:token,
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