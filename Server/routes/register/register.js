const db = require('../../config/connection');

exports.register = function(data) {
  return new Promise( (resolve, reject) => {
      db.query("SELECT * FROM cliente WHERE email = ?", [data], (error,resultS)=>{
          if(error){
              console.log(err);
              res.send({
                  success:false,
                  msg:"Ha ocurrido un error, intentelo de nuevo"
              })
          }else{
              if(resultS[0].email>0){
                    res.send({
                      success:false,
                      msg:"Este correo ya esta asociado a una cuenta"
                    })
              }else if(resultS[0].doc_identidad>0){
                  res.send({
                      success:false,
                      msg:"Este documento de identidad ya esta asociado a una cuenta"
                  })
              }else{
                db.query(`INSERT INTO cliente SET ?`,[data], (error, resultI) => {
                    if(error) {
                      console.log('error en el login', error.stack);
                      return reject('Error en el login')
                    }
                    resolve(resultI[0]);
                  })
              }
          }
        })
    })
}
