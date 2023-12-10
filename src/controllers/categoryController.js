const { Categoria, SubCategoria } = require("../DB_connection");

const getAllCategorys = async (req, res) => {
  try {
    const categorys = await Categoria.findAll({
      include: [
        {
          model: SubCategoria,
          attributes: ["nombre"],
        },
      ],
    });

    if (categorys) {
      return res.status(200).json(categorys);
    } else {
      return res.status(404).send("Categoria no encontrada");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const modifyCategorys = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const category = await Categoria.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    category.nombre = nombre;
    await category.save();

    res
      .status(200)
      .json({ mensaje: "Categoría actualizada con éxito", category });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const modifySubCategorys = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const subcategory = await SubCategoria.findByPk(id);

    if (!subcategory) {
      return res.status(404).json({ mensaje: "Subcategoría no encontrada" });
    }

    subcategory.nombre = nombre;
    await subcategory.save();

    res
      .status(200)
      .json({ mensaje: "Subcategoría actualizada con éxito", subcategory });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createCategorys = async (req, res) => {
  const { nombre } = req.body;

  try {
    const newCategory = await Categoria.create({ nombre });

    res
      .status(200)
      .json({ mensaje: "Categoría creada con éxito", categoria: newCategory });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createSubCategorys = async (req, res) => {
  const { nombre, id_categoria } = req.body;

  try {
    const newSubCategory = await SubCategoria.create({ nombre, id_categoria });

    res.status(200).json({
      mensaje: "Subcategoría creada con éxito",
      subcategoria: newSubCategory,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Categoria.findByPk(id, { include: [SubCategoria] });

    if (!category) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    await SubCategoria.destroy({ where: { id_categoria: id } });

    await category.destroy();

    res.status(200).json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const subcategory = await SubCategoria.findByPk(id);
  
      if (!subcategory) {
        return res.status(404).json({ mensaje: "Subcategoría no encontrada" });
      }
  
      await subcategory.destroy();
  
      res.status(200).json({ mensaje: "Subcategoría eliminada con éxito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
  getAllCategorys,
  modifyCategorys,
  modifySubCategorys,
  createCategorys,
  createSubCategorys,
  deleteCategory,
  deleteSubCategory,
};
