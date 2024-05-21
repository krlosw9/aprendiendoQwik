import { $, component$, useContext, useOnDocument, useTask$ } from "@builder.io/qwik";
import {  type DocumentHead } from "@builder.io/qwik-city";

import { getAllPokemon } from "~/helpers/getSmallPokemon";
//import type { PokemonPageState } from "~/interfaces";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonListContext } from "~/context";

export default component$(() => {
  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage : 0,
  //   isLoading   : false,
  //   pokemons    : []
  // });
  const pokemonState = useContext(PokemonListContext);

  // useVisibleTask$(async({track}) => {
  //   track(() => pokemonState.currentPage)
    
  //   const pokemons = await getAllPokemon(pokemonState.currentPage *10);
  //   pokemonState.pokemons = [...pokemonState.pokemons,...pokemons];
  // });

  useTask$( async({track}) =>{
    track(() => pokemonState.currentPage)

    const pokemons = await getAllPokemon(pokemonState.currentPage *10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  })

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight;
    const currenScroll = window.scrollY + window.innerHeight;

    if((currenScroll + 200) >= maxScroll && !pokemonState.isLoading){
      pokemonState.isLoading = true;
      pokemonState.currentPage ++;
    }
  }))

  return(
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina actual: {pokemonState.currentPage}</span>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 mt-5">
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