// pages/api/markers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

const { Pool } = require('pg')

const client = new Pool({
  connectionString: "postgres://default:tUyXvsaMq07d@ep-dark-sea-a20skpa3-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await client.query('SELECT name, longitude, latitude FROM hospital');
        const markers = result.rows.map((row: any) => ({
            label: row.name,
            longitude: parseFloat(row.longitude),
            latitude: parseFloat(row.latitude),
        }));
        res.json(markers);
    } catch (error) {
        console.error(error);
    }
}