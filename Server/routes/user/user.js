const db = require('./../../connections/Dbconnection');

exports.user = function (id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT nombre, email FROM usuarios WHERE id = ?', [id], (error, result) => {

      if (error) {
        console.log('error en obtener data', error.stack);
        return reject('Error')
      }

      resolve(result[0]);

    })
  })
}

exports.users = function () {
  return new Promise((resolve, reject) => {
    db.query('SELECT usuarios.*, roles.nombre as rol FROM usuarios INNER JOIN roles ON roles.id=usuarios.roles_id', (error, result) => {

      if (error) {
        console.log('error en obtener data', error.stack);
        return reject('Error')
      }

      resolve(result);

    })
  })
}

exports.DelUser = function (id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM usuarios WHERE id=?', [id], (error, result) => {

      if (error) {
        console.log('error al eliminar usuario', error.stack);
        return reject('Error')
      }

      resolve(result);

    })
  })
}