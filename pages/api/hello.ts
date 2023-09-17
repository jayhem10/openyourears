// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

// export const searchAlbumsTest = async (query: string) => {
//   // Utilisez l'API Deezer pour rechercher des albums en utilisant 'fetch'
//   try {
//     const response = await fetch(
//       `https://api.deezer.com/search?q=${query}&type=album`,{
//       headers: {
//         "Content-Type": "application/json",
//         'Access-Control-Allow-Origin': '*'
//     },
//   });
//     const data = await response.json();
//   } catch (error) {
//     console.error("Erreur lors de la recherche d'albums :", error);
//   }
// };