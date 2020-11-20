const db = require('./../../connections/Dbconnection');
const bcrypt = require("bcryptjs");



exports.register = function(data) {
  return new Promise( (resolve, reject) => {
      db.query("SELECT * FROM cliente WHERE email = ?", [data.email], (error,resultS)=>{
          if(error){
              console.log(error);
            //   res.send({
            //       success:false,
            //       msg:"Ha ocurrido un error, intentelo de nuevo"
            //   })
          }else{
              if(resultS[0]){
                //   console.log(resultS[0]);
                    // res.send({
                    //   success:false,
                    //   msg:"Este correo ya esta asociado a una cuenta"
                    // })
              }else{
                console.log(data);
                db.query(`INSERT INTO cliente SET ?`,[data], (error, resultI) => {
                    if(error) {
                      console.log('error en el login', error.stack);
                      return reject('Error en el login')
                    }
                    console.log("algo"+resultI[0]);
                    resolve(resultI[0]);
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
