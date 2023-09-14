import { $, component$, useContext } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";


export default component$(() => {
  const nav = useNavigate();
  //useStore() para array o objetos
  //useSignal() para valores primitivos como enteros, string, booleanos
  
  const pokemonGame = useContext(PokemonGameContext);

  // const idPokemon = useSignal(1);
  // const showBackImage = useSignal(false);
  // const hideImage = useSignal(true);

  const changePokemon = $((value: number) =>{
    if((pokemonGame.idPokemon + value) <= 0) return;
    if((pokemonGame.idPokemon + value) > import.meta.env.PUBLIC_POKEMON_LIMIT) return;

    pokemonGame.idPokemon += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.idPokemon}</span>
      <div onClick$={() => nav(`/pokemon/${pokemonGame.idPokemon}`)}>
        <PokemonImage id={pokemonGame.idPokemon} backImage={pokemonGame.showBackImage} hideImage={pokemonGame.hideImage}/>
      </div>
      <div class="mt-2">
        <button onClick$={ () => changePokemon(-1) } class="btn btn-primary">Anterior</button>
        <button onClick$={ () => changePokemon(+1) } class="btn btn-primary ml-4">Siguiente</button>
        <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary ml-4">Voltear</button>
        <button onClick$={ () => pokemonGame.hideImage = !pokemonGame.hideImage } class="btn btn-primary ml-4">Revelar</button>
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
