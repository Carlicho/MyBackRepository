const { Product } = require('../DB_connection');


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products){
            return res.status(200).json(products);
        }else{
            return res.status(404).send('Produc not found');
        }
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};


const getProductoById = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Product.findOne({ 
            where: { id }});

        if (response){
            return res.status(200).json(response);
        }else{
            return res.status(404).send('Produc not found');
        }
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};


const postProducto = async (req, res) => {
    try {
        
        const {nombre, sku, descripcion, precio, stock, id_sub_categoria} = req.body;

        if (!nombre || !sku || !descripcion || !precio || !stock || !id_sub_categoria) 
            return res.status(401).send("Faltan datos.");

        await Product.findOrCreate({ 
            where: {nombre, sku, descripcion, precio, stock, id_sub_categoria}});

        const allProduct = await Product.findAll();
            return res.status(200).json(allProduct);
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Product.findOne({ where: { id: id }});

        if (response){
            // Soft  delete 
            return res.status(200).send('Producto eliminado');
        }else{
            return res.status(404).send('Product Not Found');
        }
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};


module.exports = {
    getProductoById,
    postProducto,
    deleteById,
    getAllProducts,
};