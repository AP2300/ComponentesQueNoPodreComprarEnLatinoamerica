const { truncate } = require("fs");
const sales = require("./sales");

module.exports.ShowSales = (_,res)=>{
    sales.sales()
    .then(async (data) => {
        console.log(data);
        res.send({
            success:true,
            ventas: data[0],
            productos: data[1]
        })
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: err
        })
    })
}