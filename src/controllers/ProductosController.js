import { createConnection } from '../database/Connection.js'

const ERROR_UNIQUE_KEY_NOT_FOUND = '23503';
const ERROR_UNIQUE_KEY_EXISTS = '23505';

const db = await createConnection();

const getAll = async (request, response) => {
    const query = {
        name: 'get-products',
        text: 'SELECT * FROM productos'
    };

    const result = await db.query(query);

    response
        .status(200)
        .send(result.rows);
};

const getOne = async (request, response) => {
    const { id } = request.params;
    
    const query = {
        name: 'get-one-product',
        text: 'SELECT * FROM productos WHERE id_producto = $1',
        values: [ id ]
    };

    const result = await db.query(query);

    if (!result.rows.length) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'El producto no existe.' }));
        return;
    }

    response
        .status(200)
        .send(result.rows[0]);
};

const create = async (request, response) => {
    const {
        id_sub_categoria,
        sku,
        nombre,
        descripcion,
        precio,
        url_imagen
     } = request.body;

    const stock = request.body.stock || 0;

    if ( !id_sub_categoria || !sku || !nombre || !descripcion || !precio || !url_imagen ) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para crear el producto.' }));
        return;
    }

    const query = {
        name: 'create-product',
        text: 'INSERT INTO productos (id_sub_categoria, sku, nombre, descripcion, precio, stock, url_imagen) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        values: [ id_sub_categoria, sku, nombre, descripcion, precio, stock, url_imagen ]
    };

    let result;

    try {
        result = await db.query(query);
    } catch (exception) {
        if ( exception.code === ERROR_UNIQUE_KEY_EXISTS ) {
            response
                .status(500)
                .send(JSON.stringify({ mensaje: exception.detail }));
            return;
        }

        response
            .status(500)
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al crear el producto.', exception }));
        return;
    }
    response.status(201).send();
};

const remove = async (request, response) => {
    const { id } = request.params;

    const query = {
        name: 'remove-product',
        text: 'DELETE FROM productos WHERE id_producto = $1',
        values: [ id ]
    };

    const result = await db.query(query);

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'El producto no existe.' }));
        return;
    }
    response.status(204).send();
};

const update = async (request, response) => {
    const { id } = request.params;
    const {
        id_sub_categoria,
        sku,
        nombre,
        descripcion,
        precio,
        stock,
        url_imagen
     } = request.body;

    if ( !id_sub_categoria || !sku || !nombre || !descripcion || !precio || !stock || !url_imagen ) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para actualizar el producto.' }));
        return;
    }

    const query = {
        name: 'update-producto',
        text: 'UPDATE productos SET id_sub_categoria = $2, sku = $3, nombre = $4, descripcion = $5, precio = $6, stock = $7, url_imagen = $8 WHERE id_producto = $1',
        values: [ id, id_sub_categoria, sku, nombre, descripcion, precio, stock, url_imagen ]
    };

    let result;
    
    try {
        result = await db.query(query);
    } catch (exception) {
        if ( [ERROR_UNIQUE_KEY_NOT_FOUND, ERROR_UNIQUE_KEY_EXISTS].includes(exception.code) ) {
            response
                .status(500)
                .send(JSON.stringify({ mensaje: exception.detail }));
            return;
        }

        response
            .status(500)
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al actualizar el producto.' }));
        return;
    }

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'El producto no existe.' }));
        return;
    }

    // si se llega a remover el id de la query, podemos tener problemas...
    if (result.rowCount > 1) {
        response
            .status(500)
            .send(
                JSON.stringify({
                    mensaje: 'Error en la actualización de producto. Se actualizó más de un registro.',
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
    create,
    remove,
    update
};