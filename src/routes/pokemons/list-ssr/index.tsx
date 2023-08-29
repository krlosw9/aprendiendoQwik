import { component$, useComputed$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getAllPokemon } from "~/helpers/getSmallPokemon";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) =>{
  const offset = Number(query.get('offset'))

  if (isNaN(offset) || offset < 0) throw redirect(301, pathname)
  
  // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  // const data = await resp.json();
  // return data.results;

  return getAllPokemon(offset);
})

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$(() =>{
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset'));
  })

  const handlerUrl = (action: number) =>{
    if(action === -10 && currentOffset.value <= 0) return 

    return `/pokemons/list-ssr/?offset=${currentOffset.value+action}`
  }

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset.value}</span>
        <span class='h-4'> {location.isNavigating ? 'Cargando...' : ''}</span>
      </div>

      <div class="mt-10">
        <Link href={handlerUrl(-10)}
          class="btn btn-primary mr-2">
          Anterior
        </Link>
        <Link href={handlerUrl(+10)} 
          class="btn btn-primary">
          Siguiente
        </Link>
      </div>

      <div class="grid grid-cols-5 mt-5">
        {
          pokemons.value.map(({name, id}) =>(
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
  title: "SSR-List"
}