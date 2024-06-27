// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASEB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

export default pool;