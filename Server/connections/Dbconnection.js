import Sql from "mysql";

var DBconfig = {
    connectionLimit : 1,
    host     : "",
    port     : "",
    user     : '',
    password : '',
    database : ''
};

module.exports = Sql.createPool(DBconfig);