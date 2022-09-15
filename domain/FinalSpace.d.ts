export type EpisodeType = {
  id: number,
  name: string,
  air_date: string,
  director: string,
  writer: string,
  characters: string[],
  img_url: string
}

export type CharacterType = {
  id: number
  name: string
  status: string
  species: string
  gender: string
  hair: string
  img_url: string
}