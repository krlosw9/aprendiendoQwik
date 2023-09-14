import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

//Esto se ejecuta del lado del servidor
export const usePokemonId = routeLoader$<number>(({params, redirect, env}) => {
  
  const id = Number(params.id);
  const pokemonLimit = Number(env.get('POKEMON_LIMIT'));
  
  if((isNaN(id) || (id <= 0) || (id > pokemonLimit))){
    throw redirect(302, '/');
  }
  
  return id;
})

//Esto se ejecuta del lado del cliente
export default component$(() => {
  //const loc = useLocation();
  const pokemonId = usePokemonId();
  const pokemonGame = useContext(PokemonGameContext);

  return(
    <>
      {/* <span class="text-5xl">Pokemon: {loc.params.id}</span> */}
      <span class="text-5xl">Pokemon: {pokemonId.value}</span>
      <PokemonImage id= {pokemonId.value} backImage={pokemonGame.showBackImage} hideImage={pokemonGame.hideImage}/>
    </>
  )
})