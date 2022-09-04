import React, {useEffect, useState} from 'react';
import Image from 'next/image'

type PropsType = {
  characterURL: string
}
export const CharacterImage: React.FC<PropsType> = ({characterURL}) => {
  const [imgSrc, setData] = useState<string>('')

  useEffect(() => {
    fetch(`/api/character?characterURL=${characterURL}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(({imgSrc}) => {
        setData(imgSrc)
      })
      .catch(e => console.log(e))
  }, [])

  if(!imgSrc) return <div className="w-[50px] h-[50px] bg-gray-100 rounded" />

  return (
    <Image src={imgSrc} width={50} height={50} layout="fixed" className="rounded" placeholder="blur" blurDataURL="/blur.jpg"/>

  )
}