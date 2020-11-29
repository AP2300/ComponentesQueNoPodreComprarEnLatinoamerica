const product         = require("./product"),
      { v4: uuidv4 }  = require('uuid');

module.exports.ShowProduct = (req,res)=>{
    let query = req.query.id
    product.product(query)
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"En catalogo no hay nada"
            })
        }else{
            res.send({
                data:data,
                success:true,
                msg:"Producto encontrado exitosamente"
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error al cargar el producto"
        })
    })
}

module.exports.addProduct = (req,res)=>{
    let {nombre, precio, cantidad_stock, marca, descripcion, categoria_id} = req.body;
    let foto = req.files.foto;
    
    let data = {
        nombre, 
        precio, 
        cantidad_stock,
        foto,
        marca, 
        descripcion, 
        categoria_id
    }

    if(foto!==null) {
        uniqueName = uuidv4();
        imgSource = `http://localhost:3000/img/${uniqueName}${foto.name.slice(foto.name.indexOf("."))}`;
        foto.mv(`./src/img/${uniqueName}${foto.name.slice(foto.name.indexOf("."))}`, (err)=>{
            if(err) {    
                console.log(err);
                res.send({
                    success: false,
                    msg: "Error en subida de archivo"
                });
            }
        })
    }

    data.foto=imgSource;

    product.addProductInfo(data)
    .then(async (data) => {
        res.send({
            success:true,
            msg:"Producto creado exitosamente"
        });
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error al crear el producto"
        })
    })
}