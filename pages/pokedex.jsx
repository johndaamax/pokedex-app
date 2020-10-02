import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import _ from 'lodash'

import Layout from '../components/Layout/Layout';
import { Wrapper } from '../styles/shared'
import PokedexContainer from '../components/PokedexContainer/PokedexContainer';
import { useAppContext } from '../context/AppProvider';
import Image from '../util/Image/Image';
import CustomInput from '../components/CustomInput/CustomInput'

import { fetchAllPokemon } from '../api/api'

const Main = styled.section`
    width: 60%;
    margin: 0 auto;
    padding: 0.5rem;
    border-radius: 10px;
    transition: width 0.5s ease;
    background: #fff;
    h2, h4 {
        text-align: center;
        margin: 0;
    }

    @media (max-width: 768px) {
        width: 80%;
        min-width: 320px;
    } 
`

const Recents = styled.section`
    width: max-content;
    max-width: 65%;
    border-radius: 10px;
    background: #fff;
    padding: 0.4em;
    margin: 0 auto;
    text-align: center;
    h4 {
        margin: 0;
    }
    .container {
        display: flex;
        justify-content: center;
        text-align: center;
        flex-flow: row wrap;

        .item {
            width: 16%;
            min-width: 120px;
            display: flex;
            margin: 0.4em;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border: 1px solid #a0a0a0;
            border-radius: 7px;
            transition: all 0.3s ease;
            &:hover {
                box-shadow: 0 2px 3px 1px rgba(21,21,21,0.9);
                cursor: pointer;
                color: #fff;
                background: #232323;
            }
            
            img {
                height: 64px;
                width: 64px;
            }
            span {
                text-transform: capitalize;
                margin-top: -5px;
            }

            @media (max-width: 768px) {
                width: 25%;
            } 
        }
    }
`

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1em 0;
`

const Input = styled(CustomInput)`
    margin: 0 auto;
    padding: 0.2em 1em;
    width: 200px;
    height: 35px;
    border: 1px solid #a0a0a0;
    border-radius: 7px;
    &:focus {
        border: 2px solid #323232;
        outline: none;
        &::placeholder {
            color: transparent;
          }
    }
`
const Pokedex = ({ pokemon }) => {
    const [pkmList, setpkmList] = useState(pokemon.results);
    const [searchValue, setSearchValue] = useState('');

    const context = useAppContext();
    const { allPokemon, handlePokemonData, recentList } = context;
    useEffect(() => {
        // if context is empty, populate the appropriate fields with data from SSR
        if (pokemon.results.length > 0) {
            handlePokemonData(pokemon.results)
        }
    }, [handlePokemonData])

    useEffect(() => {
        //check if context is populated and load data from there
        if (allPokemon.length > 0) {
            setpkmList(allPokemon);
        }
    }, [])

    const searchPoke = (value) => {
        if (value) {
            const newList = pokemon.results.filter(poke => poke.name.includes(value) || poke.url.split('/')[6].includes(value))
            setpkmList(newList);
        } else {
            setpkmList(pokemon.results);
        }
    }

    return (
        <Layout>
            <Wrapper>
                <Head>
                    <title>Pokedex</title>
                </Head>
                {recentList && recentList.length > 0 &&
                    <Recents>
                        <h4>Recently searched</h4>
                        <div className='container'>
                            {recentList.map(pkmn => (
                                <Link href={`/pokemon/${pkmn.id}`}>
                                    <a className='item'>
                                        <Image
                                            src={pkmn.sprites.front_default}
                                            fallbackSrc='/static/missing.png'
                                            alt={`${pkmn.name} Sprite`} />
                                        <span>{pkmn.name}</span>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </Recents>
                }
                <InputContainer>
                    <span>Search</span>
                    <Input placeholder='Search by name or ID' searchPoke={searchPoke} />
                </InputContainer>
                <Main>
                    <h2>Pokedex</h2>
                    {pokemon && <PokedexContainer list={pkmList} />}
                </Main>
            </Wrapper>
        </Layout>
    )
}

Pokedex.getInitialProps = async () => {
    const pokemon = await fetchAllPokemon();
    return { pokemon }
}

export default Pokedex;
