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

module.exports.DeleteProduct = (req,res)=>{
    let query = req.query.id
    product.deleteProduct(query)
    .then(async (data) => {
        if(data == undefined){
            res.send({
                success:false,
                msg:"Hubo un problema al Eliminar el producto"
            })
        }else{
            res.send({
                success:true,
                msg:data
            }) 
        }
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success:false,
            msg: "Error al eliminar el producto"
        })
    })
}

module.exports.UpdateProduct = (req,res)=>{

    let {nombre, precio, cantidad_stock, marca, descripcion, categoria_id} = req.body;
    let foto;
    let id = req.query.id;
    let data;
    
    console.log(req.body);

    if(req.body.notchange == 'false'){
        foto = req.files.foto;
        data = {
            nombre, 
            precio, 
            cantidad_stock,
            foto,
            marca, 
            descripcion, 
            categoria_id
        }
        
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
        data.foto=imgSource;
    }else{
        data = {
            nombre, 
            precio, 
            cantidad_stock,
            marca, 
            descripcion, 
            categoria_id
        }
    }    
    

    product.updateProduct(data,id)
    .then(async (info) => {
        res.send({
            success: true,
            msg:info})
    })
    .catch(err=>{
        console.log(err);
        res.send({
            success: true,
            msg:'Hubo un problema al hacer la actualizacion'})
    })
}