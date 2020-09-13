import { useState, useContext, createContext } from 'react'

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [recentList, setRecentList] = useState([]);

    const handlePokemonData = pokemon => {
        setAllPokemon(pokemon);
    }

    const handleRecentList = list => {
        setRecentList(list);
    }

    const context = {
        allPokemon,
        handlePokemonData,
        recentList,
        handleRecentList
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext)
