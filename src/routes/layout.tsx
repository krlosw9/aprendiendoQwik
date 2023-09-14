import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/shared/navbar/navbar";

import styles from "./styles.css?inline";
import { PokemonGameContext, PokemonListContext } from "~/context";
import type { PokemonListState, PokemonGameState } from "~/context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};


export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    idPokemon     : 1,
    showBackImage : false,
    hideImage     : false
  });

  const pokemonListState = useStore<PokemonListState>({
    currentPage : 0,
    isLoading   : false,
    pokemons    : []
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonListState);

  return (
    <>
      <Header />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
