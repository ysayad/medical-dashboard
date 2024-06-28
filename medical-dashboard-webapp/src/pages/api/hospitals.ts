import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { hospitalId } = req.query;

    if(hospitalId) {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM hospital WHERE id_organization = $1', [hospitalId]);
            client.release();

            res.status(200).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM hospital');
            client.release();

            res.status(200).json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}