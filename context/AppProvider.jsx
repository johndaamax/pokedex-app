import { useState, useContext, createContext } from 'react'

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [recentList, setRecentList] = useState([]);

    const handlePokemonData = pokemon => {
        setAllPokemon(pokemon);
    }

    const handleRecentList = list => {
        setRecentList(list);
    }

    return (
        <AppContext.Provider value={{
            allPokemon: allPokemon,
            recentList: recentList,
            handlePokemonData: handlePokemonData,
            handleRecentList: handleRecentList
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext)
