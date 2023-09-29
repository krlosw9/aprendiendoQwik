import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";


export default component$(() => {
  //useStore() para array o objetos
  //useSignal() para valores primitivos como enteros, string, booleanos

  const nav = useNavigate();

  const {
    pokemonId, 
    pokemonHideImage,
    pokemonShowBackImage,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible
  } = usePokemonGame();

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>
      <div onClick$={() => nav(`/pokemon/${pokemonId.value}`)}>
        <PokemonImage id={pokemonId.value} backImage={pokemonShowBackImage.value} hideImage={pokemonHideImage.value}/>
      </div>
      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary">Anterior</button>
        <button onClick$={ nextPokemon } class="btn btn-primary ml-4">Siguiente</button>
        <button onClick$={ toggleFromBack } class="btn btn-primary ml-4">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary ml-4">Revelar</button>
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
