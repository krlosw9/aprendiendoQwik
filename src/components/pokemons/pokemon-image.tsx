import { component$ } from "@builder.io/qwik";

interface Props {
  id  : number;
  size?: number;
  backImage: boolean;
}


export const PokemonImage = component$(({ id, size=200, backImage=false }:Props ) =>{

  return(
    <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backImage ? 'back/' : ''}${id}.png`} 
        alt="Pokemon sprite" 
        width={size} height={size}
    />
  )
});

