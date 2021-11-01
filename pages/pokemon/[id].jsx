import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import _ from 'lodash';

import Layout from '../../components/Layout';
import { Wrapper } from '../../styles/shared';
import InfoBox from '../../components/InfoBox';
import StatTable from '../../components/StatTable';
import ImageOpt from '../../util/ImageOpt';
import {
  typeColors,
  pokemonBackgroundColors,
  wrapperBackgroundColors
} from '../../styles/styles';
import { usePokemonList, updateRecentList } from '../../context/AppProvider';

import { pokeApiGraphQLFetch } from '../../api/graphql-beta';
import { getAllPokemonWithAlternates, getPokeDataByDexNumber } from '../../graphql/queries'
import { truncText } from '../../util/helpers';
import Select from '../../util/Select';
import Tooltip from '../../util/Tooltip';
import CustomTable from '../../components/CustomTable';

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
`;
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
`;
const ImageContainer = styled.div`
    width: 255px;
    min-width: 240px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        margin: 0 auto 1em;
        width: 25%;
    }
`;
const PokeImage = styled(ImageOpt)`
    border-radius: 7px;
    background: #fff;
    padding: 0.5em;
`;
const FlavorText = styled.div`
    background-color: #fff;
    border-radius: 10px;
    margin-top: 0.5em;
    padding: 0.5rem;
    > p {
        margin: 0;
    }
`;
const TypeDiv = styled.div`
    background: ${props => typeColors[props.type]};
    color: #FFF;
    border-radius: 7px;
    text-transform: capitalize;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 6px;
    margin: 0 0.2rem;
`;
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
`;
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
`;

const Pokemon = ({ pokemon }) => {
  const router = useRouter();
  const [currentSpeciesNumber, setCurrentSpeciesNumber] = useState(pokemon.speciesID);
  //value to indicate the pokemon's active form (1 is the default, 2 or higher are alternate forms)
  const pokemonForm = useRef(1);
  const [state, dispatch] = usePokemonList();
  //to console log the pokemon, go to network tab and preview the JSON response

  const {
    height,
    weight,
    baseExperience,
    id,
    speciesID,
    name,
    abilities,
    stats,
    types,
    moves,
    species,
  } = pokemon;

  const {
    baseHappiness,
    captureRate,
    hatchCounter,
    growthRate,
    dexColor,
    flavorTexts,
    forms
  } = species;

  const transformedFormList = forms.map(({ name, id }, idx) => ({ value: `/pokemon/${id}`, label: name, form: idx + 1 }))
  const hasAlternateForms = transformedFormList.length > 1;

  const primaryBackground = pokemonBackgroundColors[types[0].type.name];
  const wrapperBackground = wrapperBackgroundColors[types[0].type.name];
  const secondaryBorder = (types[1] && pokemonBackgroundColors[types[1].type.name]) ?? '#777777';
  //numbers for previous, current and next pokemon - note that these are off by 1 when looking in arrays since they start from 0
  const
    previousPoke = speciesID - 1,
    currentPoke = speciesID,
    nextPoke = speciesID + 1;

  useEffect(() => {
    const { id, name, spriteFrontURL } = pokemon;
    updateRecentList(dispatch, state, { id, name, spriteFrontURL })
    if (currentSpeciesNumber !== speciesID) {
      pokemonForm.current = 1;
      setCurrentSpeciesNumber(speciesID);
    }
  }, [pokemon])

  const getPokeImageNumber = (number, hasAlternateForms = false, form = 1) => {
    const formattedNum = number.toLocaleString('en-US', { minimumIntegerDigits: 3 });
    if (hasAlternateForms) {
      const isAlternate = form !== 1 ? `_f${form}` : '';
      return `${formattedNum}${isAlternate}`
    }
    return `${formattedNum}`;
  }

  const getFlavorText = (flavorTexts) => {
    return flavorTexts[0].text.replace('\f', ' ');
  }

  const getAbilityText = (ability) => {
    const { effectTexts } = ability;
    return effectTexts[0].effect || 'Ability description not available.';
  }

  const handleDropdownChange = (option) => {
    if (pokemonForm.current !== option.form) {
      pokemonForm.current = option.form;
      // setActivePokemonForm(option.form);
      router.push(option.value);
    }
  }

  return (
    <Layout>
      <Wrapper color={wrapperBackground}>
        <Head>
          <title>Overview of {_.capitalize(name)}</title>
        </Head>
        <PokeName>
          <span className='id'>#{speciesID}</span>
          <p>{_.startCase(name)}</p>
          {forms.length > 1 &&
            <Select
              onChange={handleDropdownChange}
              list={transformedFormList}
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
                    <ImageOpt
                      source={`/static/art/${getPokeImageNumber(previousPoke)}.png`}
                      width={48}
                      height={48}
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
                    <ImageOpt
                      source={`/static/art/${getPokeImageNumber(nextPoke)}.png`}
                      width={48}
                      height={48}
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
              source={`/static/art/${getPokeImageNumber(currentPoke, hasAlternateForms, pokemonForm.current)}.png`}
              alt={name}
              width={250}
              height={250}
            />
            <FlavorText>
              <strong>Description:</strong>
              <p>
                {getFlavorText(flavorTexts)}
              </p>
            </FlavorText>
          </ImageContainer>
          <Summary color={primaryBackground} border={secondaryBorder}>
            <div className='attributes'>
              <InfoBox type="Type">
                {types.map(t =>
                  <TypeDiv type={t.type.name} key={t.type.name}>{t.type.name}</TypeDiv>)
                }
              </InfoBox>
              <InfoBox type='Abilities'>
                {abilities.length > 0 ? abilities.map(a =>
                  <AbilityDiv
                    key={a.id}>
                    <div className='ability-text'>
                      <p>{a.ability.name}</p>
                      {a.isHidden && <small style={{ marginTop: '0.5rem' }}>Hidden Ability</small>}
                    </div>
                    <Tooltip text={truncText(getAbilityText(a.ability))}>
                      <ImageOpt src='/static/help-18.png' alt='ability-text-tooltip' width={18} height={18} />
                    </Tooltip>
                  </AbilityDiv>) :
                  <AbilityDiv>
                    Unknown
                  </AbilityDiv>
                }
              </InfoBox>
              <div className='minor'>
                <InfoBox type='Height'>{height ? `${height / 10.0}m` : 'Unknown'}</InfoBox>
                <InfoBox type='Weight'>{weight ? `${weight / 10.0}kg` : 'Unknown'}</InfoBox>
              </div>
              <div className='minor'>
                <InfoBox type='Base Experience'>{baseExperience ?? 'Unknown'}</InfoBox>
                <InfoBox type='Leveling Rate'>{_.startCase(growthRate.name ?? 'Unknown')}</InfoBox>
              </div>
              <div className='minor'>
                <InfoBox type='Pokedex Color' >{_.startCase(dexColor.name ?? 'Unknown')}</InfoBox>
                <InfoBox type='Base Friendship' >{baseHappiness ?? 'Unknown'}</InfoBox>
              </div>
            </div>
            {/* {pokemon.pokemon_v2_pokemonstats && pokemon.pokemon_v2_pokemonstats.length > 0 && <StatTable pokemon={pokemon} />}
            <CustomTable
              columns={[
                { Header: 'Move Name', accessor: 'move' },
                { Header: 'Level', accessor: 'level' }
              ]}
              data={filterMovesLearnedViaMethod(moves, 'level-up').map(el => ({ move: _.startCase(el.move.name), level: el.details.level_learned_at }))} /> */}
          </Summary>
        </PokeDetails>
      </Wrapper>
    </Layout>
  )
}

//migrate to GraphQL endpoint for vastly reduced download size
export const getStaticPaths = async () => {
  const data = await pokeApiGraphQLFetch(getAllPokemonWithAlternates);
  const { data: { pokemon } } = data;
  const paths = pokemon.map((pokemon) => ({
    params: { id: pokemon.id.toString() },
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  const data = await pokeApiGraphQLFetch(getPokeDataByDexNumber, { dex_number: id });
  const { data: { pokemon } } = data;

  if (!pokemon) {
    return {
      notFound: true,
    }
  }

  const getPokeSpriteURLByNumber = (number) => {
    // temporary method because the sprite data is not included in the PokeAPI GraphQL backend
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
  }
  const transformed = { ...pokemon, spriteFrontURL: getPokeSpriteURLByNumber(pokemon.id) };

  return {
    props: { pokemon: transformed }
  }
}

export default Pokemon