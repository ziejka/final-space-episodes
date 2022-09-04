import React from 'react';
import type {EpisodeType} from '../../domain/FinalSpace';
import Image from 'next/image'
import {Characters} from '../Characters/Characters';
import {ImageLoaderProps} from 'next/dist/client/image';

type PropsType = {
  episode: EpisodeType
}

export const Episode: React.FC<PropsType> = ({episode}) => {
  return (
    <section className="shadow-md flex border py-2 px-2 rounded justify-between" key={episode.id} >
      <div className="flex flex-col-reverse md:flex-row gap-2" >
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