import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>pokemons / list-ssr</>
  )
})

export const head: DocumentHead = {
  title: "SSR-List"
}