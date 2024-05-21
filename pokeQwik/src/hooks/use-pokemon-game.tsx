import { $, useComputed$, useContext } from "@builder.io/qwik"
import { PokemonGameContext } from "~/context"



export const usePokemonGame = () =>{
  const pokemonGame = useContext(PokemonGameContext);
  
  const changePokemon = $((value: number) =>{
    if((pokemonGame.idPokemon + value) <= 0) return;
    if((pokemonGame.idPokemon + value) > import.meta.env.PUBLIC_POKEMON_LIMIT) return;

    pokemonGame.idPokemon += value;
  });

  const toggleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const toggleVisible = $(() =>{
    pokemonGame.hideImage = !pokemonGame.hideImage;
  })
  
  return {
    pokemonId           : useComputed$(() => pokemonGame.idPokemon ),
    pokemonHideImage    : useComputed$(() => pokemonGame.hideImage ),
    pokemonShowBackImage: useComputed$(() => pokemonGame.showBackImage ),

    nextPokemon: $(() => changePokemon(+1)),
    prevPokemon: $(() => changePokemon(-1)),

    toggleFromBack: toggleFromBack,
    toggleVisible : toggleVisible
  }
}