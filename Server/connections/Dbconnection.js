const Sql = require("mysql");

var DBconfig = {
    connectionLimit : 1,
    host     : "remotemysql.com",
    port     : "3306",
    user     : 'Uf8RIeXg2c',
    password : 'n4WMYf7dUv',
    database : 'Uf8RIeXg2c'
};

module.exports = Sql.createPool(DBconfig);