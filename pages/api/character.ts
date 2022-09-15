// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {EpisodeType} from '../../domain/FinalSpace';
// @ts-ignore
import cacheData from 'memory-cache';
import {fetchWithCache} from '../../utils/fetchWithCache';

type ResponseData = {
  imgSrc: string
  id: number
} | {
  error: string
}

type CharacterPartialType = { img_url: string, id: number }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const charactersURL = req.query.characterURL
    if (typeof charactersURL !== 'string') {
      throw 'Invalid character link'
    }
    const {img_url, id} = await fetchWithCache<CharacterPartialType>(charactersURL);

    res.status(200)
      .json({imgSrc: img_url, id})
  } catch (e) {
    res.status(500).json({error: `failed to load data ${req.query.characterURL}`})
  }
}
