const db = require('../../connections/Dbconnection');

exports.product = (id)=> {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT * FROM producto WHERE id = ?`,[Number(id)], (error, result) => {
      if(error) {
        console.log('error al cargar el producto  1 -->', error.stack);
        return reject('Error al Cargar el producto')
      }else{
        db.query("SELECT frecuencia, ver_pci, boost_reloj, vram, tipo_vram, tdp FROM tarjeta_video WHERE producto_id = ?", [Number(id)], (error, result1)=>{
          if(error){
            console.log("error al cargar el producto ==>", error.stack);
            return reject("Error al cargar el producto");
          }else{
            let Fresult = {
              basic: result[0],
              advanced:result1[0]
            }
            resolve(Fresult);
          }
        })
      }
    })
  })
}