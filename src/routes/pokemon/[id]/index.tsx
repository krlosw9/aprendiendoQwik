import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

//Esto se ejecuta del lado del servidor
export const usePokemonId = routeLoader$<number>(({params, redirect}) => {
  
  const id = Number(params.id);
  
  if((isNaN(id) || (id <= 0) || (id > 1010))){
    throw redirect(302, '/');
  }
  
  return id;
})

//Esto se ejecuta del lado del cliente
export default component$(() => {
  //const loc = useLocation();
  const pokemonId = usePokemonId();

  return(
    <>
      {/* <span class="text-5xl">Pokemon: {loc.params.id}</span> */}
      <span class="text-5xl">Pokemon: {pokemonId.value}</span>
      <PokemonImage id= {pokemonId.value}/>
    </>
  )
})