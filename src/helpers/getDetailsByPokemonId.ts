import { type flavorTextEntries } from "~/interfaces/pokemon-details.response";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon-species';

export const getDetailsByPokemonId = async(id: string) =>{
  const resp = await fetch(`${baseUrl}/${id}`);
  const data = (await resp.json()) as any;
  
  const descripInSpanish = data.flavor_text_entries.filter(
    (item:flavorTextEntries) => item.language.name === 'es'
  );
  
  return descripInSpanish.map((item:flavorTextEntries) => item.flavor_text).join(' ');
}