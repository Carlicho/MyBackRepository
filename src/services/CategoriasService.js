import { createConnection } from '../database/Connection.js';

const db = await createConnection();

const getOne = async (id) => {
    const query = {
        name: 'get-one-category',
        text: 'SELECT * FROM categorias WHERE id_categoria = $1',
        values: [ id ]
    };

    const result = await db.query(query);

    return result;
};

export default {
    getOne
};
