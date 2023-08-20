import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import type { BasicPokemonInfo } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async() =>{
    
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
  const data = await res.json();

  return data.results;
});

export default component$(() => {
  const pokemons = usePokemonList();
  
  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: xxxx</span>
        <span>Está cargando página: xxxx</span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=10`}
          class="btn btn-primary mr-2">
          Anterior
        </Link>
        <Link href={`/pokemons/list-ssr/?offset=20`} 
          class="btn btn-primary">
          Siguiente
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({name}) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
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