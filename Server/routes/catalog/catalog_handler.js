const catalog = require("./catalog");

module.exports.ShowCatalog = (req,res)=>{
    catalog.catalog()
    .then(async (data) => {
        console.log("log del then ==>"+data);
        if(data == undefined){
            res.send({
                success:false,
                msg:"En catalogo no hay nada"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"Aqui esta el catalogo"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error Fatal del Catalogo"
        })
    })
}