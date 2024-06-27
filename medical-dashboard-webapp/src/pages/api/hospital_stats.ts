import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { hospitalId } = req.query;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM hospital_stats WHERE hospital_id = $1', [hospitalId]);
        client.release();

        res.status(200).json(result.rows[0]); // Retourne seulement la première ligne (suppose qu'il n'y en a qu'une par hospital_id)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}