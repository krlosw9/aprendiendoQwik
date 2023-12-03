import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { Modal } from "~/components/shared";
import { getDetailsByPokemonId } from "~/helpers/getDetailsByPokemonId";
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
  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  const currentOffset = useComputed$(() =>{
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset'));
  })

  const handlerUrl = (action: number) =>{
    if(action === -10 && currentOffset.value <= 0) return 

    return `/pokemons/list-ssr/?offset=${currentOffset.value+action}`
  }

  const showModal = $((id: string, name: string) =>{
    modalPokemon.id = id;
    modalPokemon.name = name;
    
    modalVisible.value = true;
  })

  const closeModal = $(() =>{
    modalVisible.value = false;
  })

  useVisibleTask$(({track}) =>{
    track(() => modalPokemon.name);

    if(modalPokemon.name.length > 0){
      getDetailsByPokemonId(modalPokemon.id).then(
        (resp) => (console.log(resp))
      )
    }
  })

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
            <div 
            key={name} 
            onClick$={() => showModal(id, name)}
            class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id}/>
              <span class="capitalize">{name}</span>
            </div>
          ))
          
        }
      </div>

      <Modal showModal={modalVisible.value} closeFn={closeModal} persistent size="md">
        
        <div q:slot="title">
          {modalPokemon.name}
        </div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage id={modalPokemon.id} />
          <span>Preguntandole a ChatGPT</span>
        </div>

      </Modal>
    </>
  )
})

export const head: DocumentHead = {
  title: "SSR-List"
}