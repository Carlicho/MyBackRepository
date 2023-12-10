const { Product, Category } = require('../DB_connection');
const { Op } = require('sequelize');


const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const filteredProduct = await Category.findAll({
            where: { category },
        });
        return res.status(200).json(filteredProduct);
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};


const getProductByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.params;
        if (isNaN(minPrice) || isNaN(maxPrice)){
            return res.status(400).send('deben ser numeros validos');
        }
        const filteredProduct = await Product.findAll({
            where: {
                precio: {
                    [Op.between ]: [minPrice, maxPrice],
                }
            }
        });
        return res.status(200).json(filteredProduct);

    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getProductByCategory,
    getProductByPrice,
};