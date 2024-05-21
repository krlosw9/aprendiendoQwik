import { createContextId } from "@builder.io/qwik";


export interface PokemonGameState{
  idPokemon       : number;
  showBackImage   : boolean;
  hideImage       : boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-conext');