import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {CharacterType} from '../../domain/FinalSpace';
import Image from 'next/image'

const perPage = 10

type PropsType = {
  character: CharacterType
}
const Character: NextPage<PropsType> = ({character}) => {
  return (
    <div className="py-2 w-11/12 mx-auto space-y-2" >
      <h1 className="uppercase mb-3 text-center text-3xl font-bold" >{character.name}</h1 >
      <section className="shadow-md flex border py-2 px-2 rounded justify-between" key={character.id} >
        <p >{character.gender}</p >
        <Image className="rounded" src={character.img_url} width={256} height={144} placeholder="blur"
               blurDataURL="/blur.jpg" layout="fixed" />
      </section >
    </div >
  )
}

export default Character

export const getStaticProps: GetStaticProps = async ({params}) => {
  console.log(params?.character);
  const response = await fetch(`https://finalspaceapi.com/api/v0/character/${params?.id}`)
  console.log(response);
  const character = await response.json()

  return {
    props: {character}
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://finalspaceapi.com/api/v0/character')
  const characters: CharacterType[] = await response.json()
  const paths = characters.map(character => ({
    params: {id: character.id.toString()}
  }))
  return {paths, fallback: 'blocking'}
}