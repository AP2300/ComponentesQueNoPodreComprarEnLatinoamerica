const   express               = require("express"),
        app                   = express(),
        BodyParser            = require("body-parser"),
        FP                    = require("express-fileupload"),
        bcrypt                = require("bcryptjs"),
        NodeMailer            = require("nodemailer")
        // fs                    = require("fs"),
        // { v4: uuidv4 }        = require('uuid');

///////////////Configuraciones de la app////////////////////
app.set("port",process.env.PORT||3000);
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(FP());
////////////////////////////////////////////////////////////

////////////Configuracion de Nodemailer///////////////
let transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "andresparedes202@gmail.com",
        pass: "rrclmyolimtffmqo"
    }
});
///////////////////////////////////////////////////////
console.log("Entre Aqui");

const register = require("./routes/register");
const login = require("./routes/login")

app.post("/register",register.ValidateData, register.RegisterUser);
app.post("/login", login.ValidateData, login.LogUser);



app.listen(app.get("port"), function(err){
    if(err) console.log(err);
    else console.log("servidor iniciado");  
});