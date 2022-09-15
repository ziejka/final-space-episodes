import React, {MouseEventHandler} from 'react';
import type {EpisodeType} from '../../domain/FinalSpace';
import Image from 'next/image'
import {Characters} from '../Characters/Characters';
import {useRouter} from 'next/router';

type PropsType = {
  episode: EpisodeType
}

export const Episode: React.FC<PropsType> = ({episode}) => {
  const router = useRouter()
  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault()
    router.push(`/episodes/${episode.id}`)
  }
  return (
    <section
      className="hover:scale-110 transition-all ease-in-out shadow-md flex border py-2 px-2 rounded justify-between" >
      <div className="cursor-pointer flex flex-col-reverse md:flex-row gap-2" key={episode.id} onClick={handleClick} >
        <Image className="rounded" src={episode.img_url} width={256} height={144} placeholder="blur"
               blurDataURL="/blur.jpg" layout="fixed" />
        <div >
          <h2 className="font-bold ext-2xl" >{episode.name}</h2 >
          <h3 className="font-thin ext-md" >{episode.air_date}</h3 >
        </div >
      </div >
      <Characters charactersURL={episode.characters} />
    </section >
  )
}