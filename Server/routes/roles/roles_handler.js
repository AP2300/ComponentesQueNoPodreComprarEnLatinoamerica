const roles = require("./roles");

module.exports.ShowRoles = (_,res)=>{
    roles.roles()
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"No hay roles"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"Aqui estan los roles"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error Fatal de roles"
        })
    })
}