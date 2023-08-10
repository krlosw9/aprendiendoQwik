import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";


export default component$(() => {
  //useStore() para array o objetos
  //useSignal() para valores primitivos como enteros, string, booleanos
  const idPokemon = useSignal(1);
  const showBackImage = useSignal(false);
  const pokemonLimit: number = 905;

  const changePokemon = $((value: number) =>{
    if((idPokemon.value + value) <= 0) return;
    if((idPokemon.value + value) > pokemonLimit) return;

    idPokemon.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{idPokemon.value}</span>

      <PokemonImage id={idPokemon.value} backImage={showBackImage.value} />

      <div class="mt-2">
        <button onClick$={ () => changePokemon(-1) } class="btn btn-primary">Anterior</button>
        <button onClick$={ () => changePokemon(+1) } class="btn btn-primary ml-4">Siguiente</button>
        <button onClick$={ () => showBackImage.value = !showBackImage.value } class="btn btn-primary ml-4">Voltear</button>
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
