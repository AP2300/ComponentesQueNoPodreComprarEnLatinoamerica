const categories = require("./categories");

module.exports.ShowCategories = (_,res)=>{
    categories.categories()
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"No hay categorias"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"Aqui estan las categorias"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error Fatal de categorias"
        })
    })
}