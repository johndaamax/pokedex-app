import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import _ from 'lodash'

import Layout from '../components/Layout';
import PokedexContainer from '../components/PokedexContainer';
import CustomInput from '../components/CustomInput';
import { Wrapper } from '../styles/shared'
import ImageOpt from '../util/ImageOpt';

import { usePokemonList, setAllPokemonList } from '../context/AppProvider';
import { pokeApiGraphQLFetch } from '../api/graphql-beta'
import { getAllDexPokemon } from '../graphql/queries'

const Main = styled.section`
    width: 60%;
    max-width: 450px;
    min-height: 495px;
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
`;
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
            
            span {
                text-transform: capitalize;
                margin-top: -5px;
            }

            @media (max-width: 768px) {
                width: 25%;
            } 
        }
    }
    .name {
        padding-top: 0.5rem;
        font-size:0.8em;
    }
`;
const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(max(20%, 300px));
    margin: 0 auto;
    ${'' /* flex-direction: column; */}
    padding: 1em 0;
`;
const Input = styled(CustomInput)`
    margin: 0 auto;
    padding: 0.8em 1em;
    width: 200px;
    border: 1px solid transparent;
    border-radius: 7px;
    &:focus {
        border: 1px solid #323232;
        outline: none;
        &::placeholder {
            color: transparent;
          }
    }
`;
const Home = ({ pokemon }) => {
    const [pkmList, setpkmList] = useState(pokemon);

    const [state, dispatch] = usePokemonList();
    useEffect(() => {
        // if context is empty, populate the appropriate fields with data from SSR
        if (pokemon.length > 0) {
            setAllPokemonList(dispatch, pokemon)
        }
    }, [])

    const searchPoke = useCallback((value) => {
        if (value) {
            const newList = pokemon.filter(poke => poke.name.includes(value) || poke.speciesID.toString().includes(value))
            setpkmList(newList);
        } else {
            setpkmList(pokemon);
        }
    }, [pokemon])

    return (
        <Layout>
            <Wrapper>
                <Head>
                    <title>Pokedex</title>
                </Head>
                {state.recentList.length > 0 &&
                    <Recents>
                        <h4>Recently searched</h4>
                        <div className='container'>
                            {state.recentList.map(pkmn => (
                                <Link key={pkmn.id} href={`/pokemon/${pkmn.id}`}>
                                    <a className='item'>
                                        <ImageOpt
                                            src={pkmn.spriteFrontURL}
                                            fallbackSrc='/static/missing.png'
                                            alt={`${pkmn.name} Sprite`}
                                            width={64}
                                            height={64} />
                                        <span className='name'>{pkmn.name}</span>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </Recents>
                }
                <InputContainer>
                    <label htmlFor='search' >Search</label>
                    <Input placeholder='Search by name or ID' searchPoke={searchPoke} id='search' />
                </InputContainer>
                <Main>
                    <h2>Pokedex</h2>
                    {pkmList.length ? <PokedexContainer list={pkmList} /> :
                        <p>No pokemon found!</p>}
                </Main>
            </Wrapper>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const data = await pokeApiGraphQLFetch(getAllDexPokemon);
    const { data: { pokemon } } = data;

    if (!pokemon) {
        return {
            notFound: true,
        }
    }

    return {
        props: { pokemon },
        revalidate: 60 * 60 * 24 //revalidate once per day for possible data changes on the API
    }
}

export default Home;
