import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";


export default component$(() => {
  const nav = useNavigate();
  //useStore() para array o objetos
  //useSignal() para valores primitivos como enteros, string, booleanos
  const idPokemon = useSignal(1);
  const showBackImage = useSignal(false);
  const hideImage = useSignal(true);

  const changePokemon = $((value: number) =>{
    if((idPokemon.value + value) <= 0) return;
    if((idPokemon.value + value) > import.meta.env.PUBLIC_POKEMON_LIMIT) return;

    idPokemon.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{idPokemon.value}</span>
      <div onClick$={() => nav(`/pokemon/${idPokemon.value}`)}>
        <PokemonImage id={idPokemon.value} backImage={showBackImage.value} hideImage={hideImage.value}/>
      </div>
      <div class="mt-2">
        <button onClick$={ () => changePokemon(-1) } class="btn btn-primary">Anterior</button>
        <button onClick$={ () => changePokemon(+1) } class="btn btn-primary ml-4">Siguiente</button>
        <button onClick$={ () => showBackImage.value = !showBackImage.value } class="btn btn-primary ml-4">Voltear</button>
        <button onClick$={ () => hideImage.value = !hideImage.value } class="btn btn-primary ml-4">Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicación en qwik",
    },
  ],
};
