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
app.use(express.static('src'));

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
const cart = require("./routes/cart")
const catalog = require("./routes/catalog");
const middle = require("./routes/middleware");
const home = require("./routes/home")
const user = require("./routes/user");
const product = require("./routes/product");
const categories = require("./routes/categories");


app.post("/register",register.ValidateData, register.RegisterUser);
app.post("/login", login.ValidateData, login.LogUser);
app.post("/addcart", middle.authHeader, middle.validSing, cart.addProduct);
app.post("/updatecart", middle.authHeader, middle.validSing, cart.UpdateCart);
<<<<<<< HEAD
app.post("/product", middle.authHeader, middle.validSing, product.addProduct);
=======
app.post("/deletecart", middle.authHeader, middle.validSing, cart.DelCart);
>>>>>>> 478ef9410cbafe1a6a870e10fddd60704e9a1dce
app.get("/catalog", catalog.ShowCatalog);
app.get("/index", middle.authHeader, middle.validSing, home.GetRecomendedData);
app.get("/user", middle.authHeader, middle.validSing, user.GetUserData);
app.get("/cart", middle.authHeader, middle.validSing, cart.Showcart);
app.get("/product", product.ShowProduct);
app.get("/categories", categories.ShowCategories);



app.listen(app.get("port"), function(err){
    if(err) console.log(err);
    else console.log("servidor iniciado");  
});