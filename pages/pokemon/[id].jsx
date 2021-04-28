import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import _ from 'lodash'

import Layout from '../../components/Layout/Layout'
import { Wrapper } from '../../styles/shared'
import InfoBox from '../../components/InfoBox/InfoBox'
import StatTable from '../../components/StatTable/StatTable'
import Image from '../../util/Image/Image'
import {
    typeColors,
    pokemonBackgroundColors,
    wrapperBackgroundColors
} from '../../styles/styles'
import { usePokemonList, updateRecentList } from '../../context/AppProvider';

import { fetchPokeBaseData } from '../../api/api'
import { getIdFromURL, truncText, getGenerationVersionGroups } from '../../util/helpers'
import Select from '../../util/Select/Select'
import Tooltip from '../../util/Tooltip/Tooltip'
import CustomTable from '../../components/CustomTable/CustomTable'

const PokeName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem auto;
    > p {
        margin: 0;
    }
    text-transform: capitalize;
    font-size: 28px;
    .id {
        margin-right: 0.5rem;
        font-weight: bold;
    }
    @media (max-width: 768px) {
        font-size: 20px;
    }

`;

const NavAdjacentSection = styled.section`
    width: 100%;
    display: flex;
    margin-bottom: 1em;
    > div {
        width: 50%;
       
    }
    > div:first-child {
        margin-right: 6px;
        figure {
            flex-direction: row-reverse;
        }
    }
    > div:last-child {
        margin-left: 6px;
    }
    
    .prev > a, .next > a {
        border-radius: 8px;
        background: #f5f5f5;
        text-decoration: none;
        color: #777;
        display: flex;
        flex-direction: row;
        align-items: center;
        &:hover {
            background-color: #232323;
            color: #fff;
            .name {
                color: #fff;
            }
        }
    }

    figure {
        display: flex;
        margin: 3px 12px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        .name {
            color: #000;
            font-weight: 700;
          
        }
        span {
            text-transform: capitalize;
            
        }
        img {
            width: 54px;
            height: 54px;
            padding: 3px;
            background: #fff;
            border-radius: 50%;
            margin: -12px 0;
            border: 2px solid #dfdfdf;
        }
    }
`
const PokeDetails = styled.div`
    display: flex;
    width: 100%;
    min-width: 440px;
    height: 80%;
    border-radius: 4px;
    flex-flow: row wrap;

    @media (max-width: 768px) {
        min-width: 320px;
    }
`
const ImageContainer = styled.div`
    width: 255px;
    min-width: 240px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        margin: 0 auto 1em;
        width: 25%;
    }
`
const PokeImage = styled(Image)`
    max-height: 250px;
    border-radius: 7px;
    background: #fff;
    padding: 0.5em;
`
const FlavorText = styled.div`
    background-color: #fff;
    border-radius: 10px;
    margin-top: 0.5em;
    padding: 0.5rem;
    > p {
        margin: 0;
    }
`
const TypeDiv = styled.div`
    background: ${props => typeColors[props.type]};
    color: #FFF;
    border-radius: 7px;
    text-transform: capitalize;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 6px;
    margin: 0 0.2rem;
`
const Summary = styled.div`
    width: 55%;
    min-width: 375px;
    margin: 0 auto;
    .attributes {
        transition: transform 0.3s ease;
        &:hover {
            transform: scale(1.1);
        }
        background-color: ${props => props.color};
        border: 3px solid ${props => props.border};
        padding: 0.6em;
        border-radius: 10px;
    }

    .minor{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        > div {
            width: 49%;
            margin: 0;
        }
    }
    .minor:first-child {
        margin-right: 1%;
    }

    @media (max-width: 768px) {
        min-width: 90%;  
    } 
`
const AbilityDiv = styled.div`
    font-size: 14px;
    margin: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .ability-text {
        margin-right: 0.3em;
        p {
            margin: 0;
        }
    }
    > small {
        display: block;
    }
`

const Pokemon = ({ pokemon }) => {
    const router = useRouter();
    const [form, setForm] = useState(1);
    const [state, dispatch] = usePokemonList();

    const primaryBackground = pokemonBackgroundColors[pokemon.types[0].type.name];
    const wrapperBackground = wrapperBackgroundColors[pokemon.types[0].type.name];
    const secondaryBorder = (pokemon.types[1] && pokemonBackgroundColors[pokemon.types[1].type.name]) || '#777777';
    //numbers for previous, current and next pokemon - note that these are off by 1 when looking in arrays since they start from 0
    const
        previousPoke = +pokemon.national_number - 1,
        currentPoke = +pokemon.national_number,
        nextPoke = +pokemon.national_number + 1;

    const pokemonForms = pokemon.varieties.map(item =>
        ({ value: `/pokemon/${getIdFromURL(item.url)}`, label: item.name, form: item.form }));
    const { moves } = pokemon;

    useEffect(() => {
        //if empty pokemon array, redirect to pokedex page
        if (state.allPokemon.length === 0) {
            router.push('/');
        }
    }, [])

    useEffect(() => {
        updateRecentList(dispatch, state, pokemon)
        if (pokemonForms.length === 1 && form !== 1)
            setForm(1);
    }, [pokemon])

    const getPokeImageURLByNumber = (number, form = 1) => {
        // form 1 is the default form, for every alternate form it increases by 1
        const numberFormatted = number < 999 ? number.toLocaleString('en-US', { minimumIntegerDigits: 3 }) : number;
        const isAlternateExtra = form !== 1 ? `_f${form}` : '';
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numberFormatted}${isAlternateExtra}.png`;
    }

    const getFlavorText = (pokemon, language = 'en') => {
        const { flavor_text_entries } = pokemon;
        const versions = ['sword', 'shield', 'lets-go-eevee', 'lets-go-pikachu', 'ultra-sun', 'ultra-moon', 'sun', 'moon', 'black-2', 'white-2', 'omega-ruby', 'alpha-sapphire', 'x', 'y'];
        for (let version of versions) {
            const text = flavor_text_entries.find(entry => entry.language.name === language && entry.version.name === version)
            if (text)
                return text.flavor_text;
        }
    }

    const getAbilityText = (ability, language = 'en') => {
        const { effect_entries } = ability;
        const text = effect_entries?.find(entry => entry.language.name === language)
        return text?.effect || 'Ability description not available.';
    }

    const handleDropdownChange = (option) => {
        if (form !== option.form) {
            setForm(option.form);
            router.push(option.value);
        }
    }

    const filterMovesLearnedViaMethod = (moves, method = 'level-up') => {
        const filteredMoves = filterMovesByLatestGeneration(moves);
        const finalMoveset = filteredMoves.filter(move => move.details.move_learn_method.name === method)
        return finalMoveset;
    }

    const filterMovesByLatestGeneration = (moves) => {
        let latestGen = 8;
        let result = [];
        // iterate from latest gen up until first until a moveset is generated
        while (result.length === 0 && latestGen > 0) {
            let versionGroups = getGenerationVersionGroups(latestGen);
            result = moves
                .filter(move =>
                    (move.version_group_details.find(item => versionGroups.includes(item.version_group.name)) ? true : false))
                .reduce((updatedMoves, move) => {
                    let updatedMove = {
                        move: move.move,
                        details: move.version_group_details.find(item => versionGroups.includes(item.version_group.name))
                    }
                    updatedMoves.push(updatedMove);
                    return updatedMoves
                }, [])
            latestGen--;
        }
        return result;
    }

    return (
        <Layout>
            <Wrapper color={wrapperBackground}>
                <Head>
                    <title>Overview of {_.capitalize(pokemon.name)}</title>
                </Head>
                <PokeName>
                    <span className='id'>#{pokemon.national_number}</span>
                    <p>{_.startCase(pokemon.name)}</p>
                    {pokemonForms.length > 1 &&
                        <Select
                            onChange={handleDropdownChange}
                            defaultTile='Forms'
                            list={pokemonForms}
                            placeholder={'Select form...'}
                        />
                    }
                </PokeName>
                <NavAdjacentSection>
                    <div className="prev">
                        {state.allPokemon[previousPoke - 1] &&
                            <Link href={`/pokemon/${previousPoke}`}>
                                <a>
                                    <figure>
                                        <span className='number'>#{previousPoke}</span>
                                        <span className='name'>{state.allPokemon[previousPoke - 1].name}</span>
                                        <Image
                                            source={getPokeImageURLByNumber(previousPoke)}
                                            fallbackSrc={pokemon.sprites.front_default}
                                        />
                                    </figure>
                                </a>
                            </Link>
                        }
                    </div>
                    <div className="next">
                        {state.allPokemon[nextPoke - 1] &&
                            <Link href={`/pokemon/${nextPoke}`}>
                                <a>
                                    <figure>
                                        <span className='number'>#{nextPoke}</span>
                                        <span className='name'>{state.allPokemon[nextPoke - 1].name}</span>
                                        <Image
                                            source={getPokeImageURLByNumber(nextPoke)}
                                            fallbackSrc={pokemon.sprites.front_default}
                                        />
                                    </figure>
                                </a>
                            </Link>
                        }
                    </div>
                </NavAdjacentSection>
                <PokeDetails>
                    <ImageContainer>
                        <PokeImage
                            source={getPokeImageURLByNumber(currentPoke, form)}
                            fallbackSrc={pokemon.sprites.front_default}
                            alt={pokemon.name} />
                        <FlavorText>
                            <strong>Description:</strong>
                            <p>
                                {getFlavorText(pokemon)}
                            </p>
                        </FlavorText>
                    </ImageContainer>
                    <Summary color={primaryBackground} border={secondaryBorder}>
                        <div className='attributes'>
                            <InfoBox type="Type">{pokemon.types.map(t => <TypeDiv type={t.type.name} key={t.slot}>{t.type.name}</TypeDiv>)}</InfoBox>
                            <InfoBox type='Abilities'>
                                {pokemon.abilities.length > 0 ? pokemon.abilities.map(a =>
                                    <AbilityDiv
                                        key={a.id}>
                                        <div className='ability-text'>
                                            <p>{a.name}</p>
                                            {a.is_hidden && <small style={{ marginTop: '0.5rem' }}>Hidden Ability</small>}
                                        </div>
                                        <Tooltip text={truncText(getAbilityText(a))}>
                                            <img src='/static/help-18.png' alt='ability-text-tooltip' />
                                        </Tooltip>
                                    </AbilityDiv>) :
                                    <AbilityDiv>
                                        Unknown
                                    </AbilityDiv>
                                }
                            </InfoBox>
                            <div className='minor'>
                                <InfoBox type='Height'>{pokemon.height ? `${pokemon.height / 10.0}m` : 'Unknown'}</InfoBox>
                                <InfoBox type='Weight'>{pokemon.weight ? `${pokemon.weight / 10.0}kg` : 'Unknown'}</InfoBox>
                            </div>
                            <div className='minor'>
                                <InfoBox type='Base Experience'>{pokemon?.base_experience || 'Unknown'}</InfoBox>
                                <InfoBox type='Leveling Rate'>{_.startCase(pokemon.growth_rate?.name || 'Unknown')}</InfoBox>
                            </div>
                            <div className='minor'>
                                <InfoBox type='Pokedex Color' >{_.startCase(pokemon.color?.name || 'Unknown')}</InfoBox>
                                <InfoBox type='Base Friendship' >{pokemon?.base_happiness || 'Unknown'}</InfoBox>
                            </div>
                        </div>
                        {pokemon.stats && pokemon.stats.length > 0 && <StatTable pokemon={pokemon} />}
                        <CustomTable
                            columns={[
                                { Header: 'Move Name', accessor: 'move' },
                                { Header: 'Level', accessor: 'level' }
                            ]}
                            data={filterMovesLearnedViaMethod(moves, 'level-up').map(el => ({ move: _.startCase(el.move.name), level: el.details.level_learned_at }))} />
                    </Summary>
                </PokeDetails>
            </Wrapper>
        </Layout>
    )
}

Pokemon.getInitialProps = async (ctx) => {
    const { query } = ctx;
    const id = query.id;
    const pokemon = await fetchPokeBaseData(id);
    return { pokemon };
}

export default Pokemon