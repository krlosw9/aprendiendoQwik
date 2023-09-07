import { component$, useStore, useTask$ } from "@builder.io/qwik";
import {  type DocumentHead } from "@builder.io/qwik-city";

import { getAllPokemon } from "~/helpers/getSmallPokemon";
import type { PokemonPageState } from "~/interfaces";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: []
  });

  // useVisibleTask$(async({track}) => {
  //   track(() => pokemonState.currentPage)
    
  //   const pokemons = await getAllPokemon(pokemonState.currentPage *10);
  //   pokemonState.pokemons = [...pokemonState.pokemons,...pokemons];
  // });

  useTask$( async({track}) =>{
    track(() => pokemonState.currentPage)

    const pokemons = await getAllPokemon(pokemonState.currentPage *10);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  })

  return(
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina actual: {pokemonState.currentPage}</span>
        <span class='h-4'>Esta cargando: </span>
      </div>

      <div class="mt-10">
        {/* <button class="btn btn-primary mr-2" onClick$={() =>{ pokemonState.currentPage-- }}>
          Anterior
        </button> */}
        <button class="btn btn-primary" onClick$={() => {pokemonState.currentPage++}}>
          Siguiente
        </button>
      </div>

      <div class="grid grid-cols-5 mt-5">
      {
          pokemonState.pokemons.map(({name, id}) =>(
            <div key={name} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id}/>
              <span class="capitalize">{name}</span>
            </div>
          ))
          
        }
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: "Client-list"
}