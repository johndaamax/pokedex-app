const gql = String.raw;

export const getAllDexPokemon = gql`
  query getAllPokemon {
    pokemon: pokemon_v2_pokemon(distinct_on: pokemon_species_id) {
      speciesID: pokemon_species_id
      name
      id
    }
  }
`;

//GraphQL query to fetch all pokemon with their alternate forms EXCLUDING totem alternates
//because we have no image artwork for them
export const getAllPokemonWithAlternates = gql`
  query getAllPokemonWithAlternates {
    pokemon: pokemon_v2_pokemon(where: {name: {_niregex: "totem"}}) {
      speciesID: pokemon_species_id
      name
      id
    }
  }
`;

//Base GraphQL query that fetches specific info for a pokemon.
//This info includes a pokemon's name, national dex number, height, weight, base exp, leveling rate,
//dex color, base friendship, stats with its values and names, moves as of gen 8 with its names, accuracy, pp and power
//abilities with its names and english effect text, a description flavor text, different forms and its types with type names.
export const getPokeDataByDexNumber = gql`
  query pokeSpecificDataQuery($dex_number: Int!) {
    pokemon:pokemon_v2_pokemon_by_pk(id: $dex_number) {
      height
      weight
      baseExperience:base_experience
      name
      speciesID:pokemon_species_id
      id
      abilities:pokemon_v2_pokemonabilities {
        id:ability_id
        isHidden:is_hidden
        ability:pokemon_v2_ability {
          name
          effectTexts:pokemon_v2_abilityeffecttexts(limit: 1, where: {language_id: {_eq: 9}}) {
            effect
          }
        }
      }
      stats:pokemon_v2_pokemonstats {
        value:base_stat
        stat:pokemon_v2_stat {
          name
        }
      }
      types:pokemon_v2_pokemontypes {
        type:pokemon_v2_type {
          name
        }
      }
      moves:pokemon_v2_pokemonmoves(where: {version_group_id: {_eq: 18}, _and: {level: {_gt: 0}}}, order_by: {level: asc}) {
        level
        move:pokemon_v2_move {
          name
          accuracy
          pp
          power
        }
        learnMethod:pokemon_v2_movelearnmethod {
          name
        }
      }
      species:pokemon_v2_pokemonspecy {
        baseHappiness:base_happiness
        captureRate:capture_rate
        hatchCounter:hatch_counter
        growthRate:pokemon_v2_growthrate {
          name
        }
        dexColor:pokemon_v2_pokemoncolor {
          name
        }
        flavorTexts:pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1, order_by: {version_id: desc}) {
          text:flavor_text
        }
        forms:pokemon_v2_pokemons(where: {name: {_niregex: "totem"}}) {
          name
          isDefault:is_default
          id
        }
      }
    }
  }
`;