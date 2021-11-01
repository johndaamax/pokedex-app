import { getIdFromURL } from '../util/helpers';

const BASE_API = 'https://pokeapi.co/api/v2';

export const fetchAllPokemon = async (config = { limit: 898 }) => {
    const pokemon = await (await fetch(`${BASE_API}/pokemon?limit=${config.limit}`)).json();
    return pokemon;
}

export const fetchResourceById = async (resourceName, id) => {
    try {
        const response = await fetch(`${BASE_API}/${resourceName}/${id}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (e) {
        return { error: e.message }
    }

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
    let abilities = data?.abilities &&
        await Promise.all(data.abilities
            .map(async (ability) => await (await fetch(ability.ability.url)).json())
        );
    abilities = abilities.map((ability, idx) => ({ ...ability, is_hidden: data.abilities[idx].is_hidden }));
    return { ...data, ...filtered, national_number: +national, varieties: alternates, abilities };
}