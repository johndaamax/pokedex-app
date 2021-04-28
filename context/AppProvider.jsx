import { useReducer, useContext, createContext } from 'react'
import { isObjectInArray } from '../util/helpers'

function PokemonListReducer(state, action) {
    switch (action.type) {
        case 'SET_ALL_POKEMON': {
            return {
                ...state,
                allPokemon: action.allPokemon
            }
        }
        case 'SET_RECENT_LIST': {
            return {
                ...state,
                recentList: action.recentList
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const PokemonListContext = createContext();

const PokemonListProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PokemonListReducer, {
        allPokemon: [],
        recentList: []
    })
    const value = [state, dispatch]

    return (
        <PokemonListContext.Provider value={value}>
            {children}
        </PokemonListContext.Provider>
    );
}

// Now using Context Module Functions pattern
// Idea from Dan Abramov, used in Kent's Epic React course
// https://twitter.com/dan_abramov/status/1125773153584676864
const updateRecentList = (dispatch, state, pokemon) => {
    // check if pokemon already exists on the recentList
    if (!isObjectInArray(state.recentList, pokemon)) {
        const newList = [pokemon, ...state.recentList]
        if (newList.length > 10)
            newList.pop()
        dispatch({ type: 'SET_RECENT_LIST', recentList: newList })
    }
}

const setAllPokemonList = (dispatch, pokemonList) => {
    dispatch({ type: 'SET_ALL_POKEMON', allPokemon: pokemonList })
}

const usePokemonList = () => {
    const context = useContext(PokemonListContext)
    if (!context)
        throw new Error(`usePokemonList must be used within a PokemonListProvider`)
    return context
}

export { PokemonListProvider, updateRecentList, setAllPokemonList, usePokemonList }