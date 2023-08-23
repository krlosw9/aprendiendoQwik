import { component$, useComputed$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import type { BasicPokemonInfo } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async({query,pathname, redirect}) =>{
  
  const offset = Number( query.get('offset') || '0' );
  if ( (isNaN(offset)) || ( offset < 0 ) ) throw redirect(301, pathname );
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  const data = await res.json();

  return data.results;
});

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const quantityPerPage = 10;

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams( location.url.search );
    return Number(offsetString.get('offset') || 0 );
  })

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: { currentOffset }</span>
        <span>Está cargando página: xxxx</span>
      </div>

      <div class="mt-10">
        <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value - quantityPerPage }` }
          class="btn btn-primary mr-2">
          Anterior
        </Link>
        <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value + quantityPerPage }` }
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
