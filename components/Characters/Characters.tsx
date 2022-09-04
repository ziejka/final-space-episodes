import React from 'react';
import {CharacterImage} from './CharacterImage';

type PropsType = {
  charactersURL: string[]
}
export const Characters: React.FC<PropsType> = ({charactersURL}) => {
  return (
    <div className="flex flex-wrap gap-1 justify-end max-w-xs" >
      {charactersURL.map(c => <CharacterImage key={c} characterURL={c} />)}
    </div >)
}