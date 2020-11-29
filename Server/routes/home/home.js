const DB = require("./../../connections/Dbconnection");

exports.recomended =()=>{
    return new Promise((resolve, reject)=>{
        DB.query("SELECT id, nombre, foto, precio, descripcion FROM producto",(err, result)=>{
            if(err){
                console.log(err);
                reject("error en la consulta")
            }else{
                console.log(result);
                resolve(result)
            }
        })
    })
}