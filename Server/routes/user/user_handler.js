const _token = require("./../../models/token")
const user = require("./user");

module.exports.GetUserData = async (req, res)=>{
    const token = req.headers["auth"];
    const decode = await _token.verifyToken(token);

    user.user(decode.id)
    .then(data =>{
        if(data==null){
            return res.send({
                success:true,
                data:data,
                log:false,
                admin: decode.admin
            })
        }else{
            return res.send({
                success:true,
                data:data,
                log:true,
                admin: decode.admin
            })
        }
    })
    .catch(err =>{
        console.log(err);
        return res.send({
            success:false
        })
    })
}