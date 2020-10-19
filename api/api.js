const BASE_API = 'https://pokeapi.co/api/v2'
import { getIdFromURL } from '../util/helpers'

export const fetchAllPokemon = async () => {
    const pokemon = await (await fetch(`${BASE_API}/pokemon?limit=893`)).json();
    return pokemon;
}

export const fetchPokeBaseData = async (id) => {
    const data = await (await fetch(`${BASE_API}/pokemon/${id}`)).json();
    const national = getIdFromURL(data.species.url);
    const speciesData = await (await fetch(data.species.url)).json();
    const filtered = (({ base_happiness, color, flavor_text_entries, genera, generation, growth_rate, varieties }) =>
        ({ base_happiness, color, flavor_text_entries, genera, generation, growth_rate, varieties }))(speciesData);
    const alternates = filtered.varieties.map((variety, idx) => ({
        is_default: variety.is_default,
        form: idx + 1,
        name: variety.pokemon.name,
        url: variety.pokemon.url
    }
    ))
    return { ...data, ...filtered, national_number: +national, varieties: alternates };
}