import { component$, Slot, useStore, useContextProvider, useVisibleTask$ } from "@builder.io/qwik";

import { PokemonGameContext, PokemonListContext } from "../index";
import type { PokemonListState, PokemonGameState } from "../index";


export const PokemonProvider = component$(() =>{
  const pokemonGame = useStore<PokemonGameState>({
    idPokemon     : 1,
    showBackImage : false,
    hideImage     : false
  });

  const pokemonListState = useStore<PokemonListState>({
    currentPage : 0,
    isLoading   : false,
    pokemons    : []
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonListState);

  useVisibleTask$(({track}) =>{
    track(() => [pokemonGame.idPokemon, pokemonGame.showBackImage, pokemonGame.hideImage])

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
  })
  
  return (
    <Slot />
  )
})