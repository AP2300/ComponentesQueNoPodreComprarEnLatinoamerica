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

app.use(BodyParser.json({'limit':'1mb'}));
app.disable('x-powered-by');

app.all('*', function(_, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, auth, Content-Length, X-Requested-With');
	next();
});
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
const register = require("./routes/register");
const login = require("./routes/login")
const catalog = require("./routes/catalog");
const middle = require("./routes/middleware");
const home = require("./routes/home")
const user = require("./routes/user");


app.post("/register",register.ValidateData, register.RegisterUser);
app.post("/login", login.ValidateData, login.LogUser);
app.get("/catalog", middle.authHeader, middle.validSing, catalog.ShowCatalog);
app.get("/index", middle.authHeader, middle.validSing, home.GetRecomendedData);
app.get("/user", user.GetUserData);



app.listen(app.get("port"), function(err){
    if(err) console.log(err);
    else console.log("servidor iniciado");  
});