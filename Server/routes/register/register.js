const db = require('./../../connections/Dbconnection');
const bcrypt = require("bcryptjs");



exports.register = function(data) {
  return new Promise( (resolve, reject) => {
      db.query("SELECT * FROM cliente WHERE email = ?", [data.email], (error,resultS)=>{
          if(error){
              console.log(error)
              resolve( {
                success:false,
                msg:"Ha ocurrido un error en el registro"
              })
          }else{
              if(resultS[0]){
                  if(resultS[0].email){
                    resolve ({success:false,
                      msg:"Este correo ya posee una cuenta asociada"})
                  }
                  if(resultS[0].doc_identidad){
                    resolve ({success:false,
                      msg:"Este documento de identidad ya posee una cuenta asociada"})
                  }

              }else{
                console.log(data);
                db.query(`INSERT INTO cliente SET ?`,[data], (error, resultI) => {
                    if(error) {
                      console.log('error en el login', error.stack);
                      return reject('Error en el login')
                    }
                    resolve({
                      success:true,
                      msg:"Usuario regsistrado satisfactoriamente"
                    });
                })
              }
          }
        })
    })
    .catch(error=>{
        console.log(error);
        res.send({
            success:false,
            msg: "Error en registro"
        })
    })
}
