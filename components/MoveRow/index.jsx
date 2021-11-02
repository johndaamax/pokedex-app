import React from 'react'
import styled from 'styled-components'

import { typeColors, wrapperBackgroundColors } from '../../styles/styles';
import ImageOpt from '../../util/ImageOpt';


const Wrapper = styled.div`
  margin: 0 auto;
  display: inline-flex;
  width: 100%;
  background: ${props => wrapperBackgroundColors[props.type.toLowerCase()]};
  padding: 0.5em 1.5em;
  margin: 0.075em 0;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 0.25em 0.5em;
  }

  .move-label {
    width: 48px;
    height: 48px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-self: center;
    align-self: center;
    margin-right: 1.5em;
    @media (max-width: 768px) {
      margin-right: 0.75em;
    }
  }

  .move-label-value {
    font-size: 1.5em;
  }

  .move-data {
    display: flex;
    flex-flow: row wrap;
    flex-basis: 100%;
  }

  .move-name {
    display: flex;
    font-size: 1.3em;
    font-weight: 800;
    align-self: center;
    text-transform: capitalize;
    width: 20%;
    @media (max-width: 1096px) {
      width: 30%;
    }
    @media (max-width: 768px) {
      width: 50%;
    }
  }

  .move-stats {
    display: flex;
    width: 40%;
    white-space: nowrap;
    align-items: center;
    > span:first-child {
      flex: 1 1 40%;
    }
    > span:not(span:first-child) {
      flex: 1 1 20%;
    }
    @media (max-width: 1096px) {
      width: 70%;
      padding: 0.75em 0;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    
  }

  .move-stat-type {
    display: inline-flex;
    align-items: center;
  }

  .move-stat-label {
    font-size: 0.75em;
  }

  .move-stat-value {
    background: white;
    display: inline-block;
    text-align: center;
    min-width: 36px;
    border-radius: 4px;
    border: 1px dotted rgba(0, 0, 0, 0.3);
    padding: 0.15em;
    margin-left: 0.5em;
  }

  .move-effects {
    width: 40%;
    display: flex;
    flex-grow: 1;
    align-items: center;
    border-radius: 2px;
    background-color: rgba(255,255,255, .75);
    padding: 0.5em 0.25em;
    @media (max-width: 1096px) {
      width: 100%;
    }
  }

  .effect-text {
    margin: 0;
  }
`;

const TypeDiv = styled.div`
    background: ${props => typeColors[props.type.toLowerCase()]};
    color: #FFF;
    border-radius: 7px;
    text-transform: capitalize;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 6px;
    margin: 0 0.2rem;
`;

const MoveRow = ({ level, name, type, power, accuracy, pp, effectText, effectChance, damageClass }) => {
  return (
    <Wrapper type={type}>
      <div className='move-label'>
        <div className='move-label-text'>Level</div>
        <div className='move-label-value' title={level}>{level}</div>
      </div>
      <div className='move-data'>
        <div className='move-name' title={name}>
          {name}
        </div>
        <div className='move-stats'>
          <span className='move-stat-type'>
            <span className='move-stat-label'>Type:</span>
            <TypeDiv type={type} title={type}>{type}</TypeDiv>
            <ImageOpt source={`/static/${damageClass.toLowerCase()}.png`} width={41} height={18} title={damageClass} />
          </span>
          <span className='move-stat-power'>
            <span className='move-stat-label'>Power:</span>
            <span className='move-stat-value' title={power}>{power}</span>
          </span>
          <span className='move-stat-accuracy'>
            <span className='move-stat-label'>Accuracy:</span>
            <span className='move-stat-value' title={accuracy}>{accuracy}</span>
          </span>
          <span className='move-stat-pp'>
            <span className='move-stat-label'>PP:</span>
            <span className='move-stat-value' title={pp}>{pp}</span>
          </span>
        </div>
        <div className='move-effects'>
          <p className='effect-text'>
            {effectChance ?
              `${effectText.replace('$effect_chance', effectChance)}` :
              `${effectText}`
            }
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

export default MoveRow
