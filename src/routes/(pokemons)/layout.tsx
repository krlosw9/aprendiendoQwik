import { component$, Slot } from "@builder.io/qwik";
import { PokemonProvider } from "~/context";
import Header from "~/components/shared/navbar/navbar";

export default component$(() =>{

  return (
    <PokemonProvider>
      <Header />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </ PokemonProvider>
  )
})