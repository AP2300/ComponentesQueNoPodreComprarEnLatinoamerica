const buy = require("./buy");
const mail = require("nodemailer")
const mailBody = require("./../../public/mail")
let transporter = mail.createTransport({
    service: "gmail",
    auth: {
        user: "andresparedes202@gmail.com",
        pass: "rrclmyolimtffmqo"
    }
})


module.exports.GetBuyDetails = (req,res)=>{
    buy.GetData(req.query.id)
    .then(data=>{
        if(data==null){

            res.send({
                success:false,
                msg: "error al recuperar los productos"
            })
        }else{

            res.send({
                success:true,
                msg: "productos encontrados exitosamente",
                data:data
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "error al recuperar los datos"
        })
    })
}

module.exports.MakeBuy = (req,res, next)=>{
    const data = req.body;
    buy.SetData(data.id,data.Fentrega, data.Fsalida, data.addrs, data.discount, data.total)
    .then(data=>{
        res.send({
            success:true,
            msg:data
        })
        next()
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "error al consultar la base de datos"
        })
    })
}

module.exports.SendMail = (req, res)=>{
    const data=req.body
    console.log(data);
    transporter.sendMail({
        from: '"Sigma"andresparedes202@gmail.com', // sender address
        to: data.email, // list of receivers
        subject: "Su pedido esta siendo procesado", // Subject line
        html:mailBody.mailContent,
        attachments:[
            {
                path: "src/img/Welcome_Email.png",
                cid: "thanksimg"

            },{
                path:"src/img/Logo.png",
                cid:"sigmalogo"
            }
        ]
        },function(err, data){
            if(err) console.log(err);
            else  console.log("email enviado");
        });
}