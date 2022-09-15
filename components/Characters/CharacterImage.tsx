import React, {MouseEventHandler, useEffect, useState} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router';

type PropsType = {
  characterURL: string
}
export const CharacterImage: React.FC<PropsType> = ({characterURL}) => {
  const [imgSrc, setData] = useState<string>('')
  const [id, setID] = useState<string>('')

  const router = useRouter()
  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    if (!id) {
      return
    }
    e.preventDefault()
    router.push(`/character/${id}`)
  }

  useEffect(() => {
    fetch(`/api/character?characterURL=${characterURL}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(({imgSrc, id}) => {
        setData(imgSrc)
        setID(id)
      })
      .catch(e => console.log(e))
  }, [])

  if (!imgSrc) return <div className="w-[50px] h-[50px] bg-gray-100 rounded" />

  return (
    <div onClick={handleClick}
         className="cursor-pointer rounded border hover:border-black transition-all ease-in-out h-min px-0.5 pt-0.5" >
      <Image src={imgSrc} width={50} height={50} layout="fixed"
             className="rounded border transition-all ease-in-out"
             placeholder="blur" blurDataURL="/blur.jpg" />
    </div >
  )
}