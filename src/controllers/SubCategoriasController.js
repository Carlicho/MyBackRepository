import { createConnection } from '../database/Connection.js';
import SubCategoriasService from '../services/SubCategoriasService.js';

const ERROR_UNIQUE_KEY_NOT_FOUND = '23503';

const db = await createConnection();

const getAll = async (request, response) => {
    const query = {
        name: 'get-subcategories',
        text: 'SELECT * FROM sub_categorias'
    };

    const result = await db.query(query);

    response
        .status(200)
        .send(result.rows);
};

const getOne = async (request, response) => {
    const { id } = request.params;
    
    const result = await SubCategoriasService.getOne(id);

    if (!result.rows.length) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La subcategoría no existe.' }));
        return;
    }

    response
        .status(200)
        .send(result.rows[0]);
};

const getOneWithProducts = async (request, response) => {
    const { id } = request.params;

    const subCategory = await SubCategoriasService.getOne(id);

    if (!subCategory.rows.length) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La subcategoría no existe.' }));
        return;
    }

    const query = {
        name: 'get-products-from-one-subcategory',
        text: `
            SELECT
                p.id_producto,
                p.sku,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock 
            FROM sub_categorias sc
            INNER JOIN productos p ON sc.id_sub_categoria = p.id_sub_categoria
            WHERE sc.id_sub_categoria = $1
        `,
        values: [ id ]
    };

    const products = await db.query(query);

    const result = subCategory.rows[0];

    // unimos la subcategoria con sus productos
    result.productos = [
        ...products.rows
    ];

    response
        .status(200)
        .send(result);
};

const create = async (request, response) => {
    const { nombre, id_categoria } = request.body;

    if (!id_categoria || !nombre) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para crear la subcategoría.' }));
        return;
    }

    const query = {
        name: 'create-subcategory',
        text: 'INSERT INTO sub_categorias (id_categoria, nombre) VALUES ($1, $2)',
        values: [ id_categoria, nombre ]
    };

    let result;

    try {
        result = await db.query(query);
    } catch (exception) {
        if ( exception.code === ERROR_UNIQUE_KEY_NOT_FOUND ) {
            response
                .status(500)
                .send(JSON.stringify({ mensaje: exception.detail }));
            return;
        }

        response
            .status(500)
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al crear la subcategoría.' }));
        return;
    }

    response.status(201).send();
};

const remove = async (request, response) => {
    const { id } = request.params;

    const query = {
        name: 'remove-subcategory',
        text: 'DELETE FROM sub_categorias WHERE id_sub_categoria = $1',
        values: [ id ]
    };

    const result = await db.query(query);

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La subcategoría no existe.' }));
        return;
    }

    response.status(204).send();
};

const update = async (request, response) => {
    const { id } = request.params;
    const { id_categoria, nombre } = request.body;

    if (!id_categoria || !nombre) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para actualizar la subcategoría.' }));
        return;
    }

    const query = {
        name: 'update-subcategory',
        text: 'UPDATE sub_categorias SET id_categoria = $2, nombre = $3 WHERE id_sub_categoria = $1',
        values: [ id, id_categoria, nombre ]
    };

    let result;
    
    try {
        result = await db.query(query);
    } catch (exception) {
        if ( exception.code === ERROR_UNIQUE_KEY_NOT_FOUND ) {
            response
                .status(500)
                .send(JSON.stringify({ mensaje: exception.detail }));
            return;
        }

        response
            .status(500)
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al actualizar la subcategoría.' }));
        return;
    }

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La subcategoría no existe.' }));
        return;
    }

    // si se llega a remover el id de la query, podemos tener problemas...
    if (result.rowCount > 1) {
        response
            .status(500)
            .send(
                JSON.stringify({
                    mensaje: 'Error en la actualización de la subcategoría. Se actualizó más de un registro.',
                    registros: result.rows
                })
            );
        return;
    }

    response.status(204).send();
};

export default {
    getAll,
    getOne,
    getOneWithProducts,
    create,
    remove,
    update
};
