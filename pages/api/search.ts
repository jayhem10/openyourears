// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const query = req.query;
    const { album } = query;
        // Utilisez l'API Deezer pour rechercher des albums en utilisant 'fetch'
          const response = await fetch(
            `https://api.deezer.com/search/album?q=${album}`,{
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
          },
        });
        const data = await response.json();    
        res.status(200).json(data.data)
}