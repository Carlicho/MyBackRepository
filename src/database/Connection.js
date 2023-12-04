import 'dotenv/config';
import pg from 'pg';

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_SCHEMA
} = process.env;

const { Client } = pg;

const createConnection = async () => {
    const client = new Client({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS
    });

    await client.connect();

    if ( DB_SCHEMA ) {
        await client.query(`SET search_path TO ${DB_SCHEMA}`);
    }

    return client;
};

export {
    createConnection
};
