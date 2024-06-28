// lib/db.ts
import { Pool } from 'pg';
import * as process from "node:process";

//const pool = new Pool({
//    user: process.env.POSTGRES_USER,
//    host: process.env.POSTGRES_HOST,
//    database: process.env.POSTGRES_DATABASE,
//    password: process.env.POSTGRES_PASSWORD,
//    port: 5432,
//});

const connectionString = process.env.POSTGRES_URL || 'postgres://user:password@host:5432/database';

// Configuration du pool de connexion
const pool = new Pool({
    connectionString: connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Query result', res.rows);
    }
    //pool.end();
});

export default pool;