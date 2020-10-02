const BASE_API = 'https://pokeapi.co/api/v2'

export const fetchAllPokemon = async () => {
    const pokemon = await (await fetch(`${BASE_API}/pokemon?limit=9999`)).json();
    return pokemon;
}

export const fetchPokeBaseData = async (id) => {
    const data = await (await fetch(`${BASE_API}/pokemon/${id}`)).json();
    return data;
}