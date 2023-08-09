import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";


export default component$(() => {
  //useStore() para array o objetos
  //useSignal() para valores primitivos como enteros, string, booleanos
  const idPokemon = useSignal(1);
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

      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon.value}.png`} 
        alt="Pokemon sprite" 
        class="w-48 h-48" />
      <div class="mt-2">
        <button onClick$={ () => changePokemon(-1) } class="btn btn-primary">Anterior</button>
        <button onClick$={ () => changePokemon(+1) } class="btn btn-primary ml-4">Siguiente</button>
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
