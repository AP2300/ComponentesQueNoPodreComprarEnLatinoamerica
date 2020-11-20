const   express               = require("express"),
        app                   = express(),
        BodyParser            = require("body-parser"),
        FP                    = require("express-fileupload"),
        bcrypt                = require("bcryptjs"),
        Sql                   = require("mysql"),
        NodeMailer            = require("nodemailer"),
        fs                    = require("fs"),
        { v4: uuidv4 }        = require('uuid');

///////////////Configuraciones de la app////////////////////
app.set("port",process.env.PORT||3000);
app.use(BodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(FP());
////////////////////////////////////////////////////////////

////////Configuracion de la DB////////
var DBconfig = {
    connectionLimit : 1,
    host     : "",
    port     : "",
    user     : '',
    password : '',
    database : ''
};

let DB = Sql.createPool(DBconfig);
////////////////////////////////////////

////////////Configuracion de Nodemailer///////////////
let transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "andresparedes202@gmail.com",
        pass: "rrclmyolimtffmqo"
    }
});
///////////////////////////////////////////////////////