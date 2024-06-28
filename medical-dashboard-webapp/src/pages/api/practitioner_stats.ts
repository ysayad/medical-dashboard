import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { practitionerId } = req.query;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM practitioner_stats WHERE id_practitioner = $1', [practitionerId]);
        client.release();

        res.status(200).json(result.rows[0]); // Retourne seulement la première ligne (suppose qu'il n'y en a qu'une par hospital_id)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}