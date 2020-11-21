const DB = require("./../../connections/Dbconnection");

exports.recomended =()=>{
    return new Promise((resolve, reject)=>{
        DB.query("SELECT nombre, foto, precio, marca FROM producto",(err, result)=>{
            if(err){
                console.log(err);
                reject("error en la consulta")
            }else{
                resolve(result)
            }
        })
    })
}