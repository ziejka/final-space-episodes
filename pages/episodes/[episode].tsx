import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {EpisodeType} from '../../domain/FinalSpace';
import Image from 'next/image'

const perPage = 10

type PropsType = {
  episode: EpisodeType
}
const Home: NextPage<PropsType> = ({episode}) => {
  return (
    <div className="py-2 w-11/12 mx-auto space-y-2" >
      <h1 className="uppercase mb-3 text-center text-3xl font-bold" >{episode.name}</h1 >
      <section className="shadow-md flex border py-2 px-2 rounded justify-between" key={episode.id} >
        <p >{episode.air_date}</p >
        <Image className="rounded" src={episode.img_url} width={256} height={144} placeholder="blur" blurDataURL="/blur.jpg" layout="fixed"/>
      </section >
    </div >
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({params}) => {
  console.log(params?.episode);
  const response = await fetch(`https://finalspaceapi.com/api/v0/episode/${params?.episode}`)
  console.log(response);
  const episode = await response.json()

  return {
    props: {episode}
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://finalspaceapi.com/api/v0/episode')
  const episodes: EpisodeType[] = await response.json()
  const paths = episodes.map(episode => ({
    params: {episode: episode.id.toString()}
  }))
  console.log(paths);
  return {paths, fallback: 'blocking'}
}