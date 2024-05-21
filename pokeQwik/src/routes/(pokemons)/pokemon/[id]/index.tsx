import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
//import { PokemonGameContext } from "~/context";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

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
  const { pokemonHideImage, pokemonShowBackImage, toggleFromBack, toggleVisible} = usePokemonGame();
  //const loc = useLocation();
  const pokemonIdRouteLoader = usePokemonId();
  //const pokemonGame = useContext(PokemonGameContext);

  return(
    <>
      {/* <span class="text-5xl">Pokemon: {loc.params.id}</span> */}
      <span class="text-5xl">Pokemon: {pokemonIdRouteLoader.value}</span>
      <PokemonImage id= {pokemonIdRouteLoader.value} backImage={pokemonShowBackImage.value} hideImage={pokemonHideImage.value}/>
      <div>
        <button onClick$={ toggleFromBack } class="btn btn-primary ml-4">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary ml-4">Revelar</button>
      </div>
    </>
  )
})