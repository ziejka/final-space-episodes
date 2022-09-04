// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {EpisodeType} from '../../domain/FinalSpace';
import {fetchWithCache} from '../../utils/fetchWithCache';

type ResponseData = {
  episodes: EpisodeType[]
  numberOfEpisodes: number
} | {
  error: string
}
const URL = 'https://finalspaceapi.com/api/v0/episode'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const offset = Number(req.query.offset) || 0
    const perPage = Number(req.query.perPage) || 10
    if (offset > 100 || perPage > 100) {
      res.status(404).json({error: 'Invalid pagination parameters'})
    }

    const episodes = await fetchWithCache<EpisodeType[]>(URL)
    const result = episodes.slice(offset, offset + perPage)
    res.status(200)
      .json({
        episodes: result,
        numberOfEpisodes: episodes.length
      })
  } catch (e) {
    res.status(500).json({error: 'failed to load data'})
  }
}
