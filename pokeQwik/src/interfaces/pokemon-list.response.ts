
export interface PokemonListResponse {
  count:    number;
  next:     string;
  previous: string;
  results:  BasicPokemonInfo[]
}

export interface BasicPokemonInfo {
  name: string;
  url:  string;
}

export interface SmallPokemon {
  name: string;
  id  : string;
}

// export interface PokemonPageState{
//   currentPage : number;
//   isLoading   : boolean;
//   pokemons    : SmallPokemon[];
// }