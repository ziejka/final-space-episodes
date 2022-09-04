import type {NextPage} from 'next'
import {useCallback, useEffect, useState} from 'react';
import {EpisodeType} from '../domain/FinalSpace';
import {Episode} from '../components/Episode/Episode';

const perPage = 10
const Home: NextPage = () => {
  const [episodes, setEpisodes] = useState<EpisodeType[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState(0)
  const [pagination, setPagination] = useState<number[]>([])
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(0)

  const fetchEpisodes = useCallback(async (page: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/episodes?offset=${page * perPage}&perPage=${perPage}`)
      if (!response.ok) {
        alert('Invalid request')
        const error = await response.json()
        throw(error)
      }
      const {episodes, numberOfEpisodes} = await response.json()
      setEpisodes(episodes)
      setNumberOfEpisodes(numberOfEpisodes)
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getPagination = (numberOfEpisodes: number) => {
    let pagination = [], index = 0
    while (index * perPage < numberOfEpisodes) {
      pagination.push(index)
      index++
    }
    return pagination
  }

  useEffect(() => {
    fetchEpisodes(page)
  }, [fetchEpisodes, page])

  useEffect(() => {
    setPagination(getPagination(numberOfEpisodes))
  }, [numberOfEpisodes])

  if (isLoading) return <div >Loading episodes...</div >

  return (
    <div className="py-2 w-11/12 mx-auto space-y-2" >
      <h1 className="uppercase mb-3 text-center text-3xl font-bold" >Final Space episodes</h1 >
      {episodes?.map(e => <Episode episode={e} />)}
      <div className="space-x-2 mt-5 flex flex-row justify-end" >
        {pagination.map(p => <button key={p}
                                     className={`rounded border bg-amber-200 px-3 py-1 hover:bg-amber-400 
                                                ${page === p && 'bg-amber-600'}`}
                                     onClick={() => setPage(p)} >{p + 1}</button >)}
      </div >
    </div >
  )
}

export default Home
