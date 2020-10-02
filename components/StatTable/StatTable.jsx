import styled from 'styled-components'
import _ from 'lodash'

import ProgressBar from '../../components/ProgressBar/ProgressBar'
import {
    typeColors,
    pokemonBackgroundColors,
    statBackgroundColors
} from '../../styles/styles'

const TableWrapper = styled.table`
    margin: 2rem auto 1rem auto;
    background-color: ${props => typeColors[props.type]};
    border-radius: 10px;
    border: 3px solid ${props => props.border};
    font-size: 100%;
    white-space: nowrap;
    max-width: 420px;
    transition: transform 0.3s ease;

    th, td {
        background-color: ${props => pokemonBackgroundColors[props.type]};
    }
    &:hover {
        transform: scale(1.1);
    }
    .header th:first-child{
        -webkit-border-top-left-radius: 10px;
    }
    .header th:last-child{
        -webkit-border-top-right-radius: 10px;
    }
    .small {
        font-size: 10px;
    }
    .stat-label {
        width: 85px;
        padding: 0.5em;
        font-size: 11px;
        font-weight: bold;
        > div:first-child {
            float: left;
        }
        > div:nth-of-type(2) {
            float: right;
        }
    }
    .progress-bar {
        width: 255px;
    }
    .list-details {
        white-space: normal;
        font-size: small;
        width: min-content;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        > ul {
            list-style-type: square;
            margin: 0.3em 0 0 1.6em;
            padding: 0;
            > li {
                margin-bottom: 0.1em;
            }
        }
    }
`;

const StatRow = styled.tr`
    background-color: ${props => statBackgroundColors[props.statName]};
    text-align: center;
`;

const StatTable = ({ pokemon }) => {

    const { types, stats } = pokemon;

    const statLabels = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
    const secondaryBorder = pokemonBackgroundColors[types[1]?.type.name] || '#777777';

    function calcRangeValues(stat) {
        //function to calculate the highest and lowest possible stat ranges at lvl. 50 and 100
        const levelRange = [50, 100];
        const EV_MAX = 252, IV_MAX = 31;
        let lowerLimit, upperLimit;
        if (stat.stat.name === 'hp') {
            lowerLimit = levelRange.map(lvl => Math.floor((2 * stat.base_stat) * lvl / 100) + lvl + 10);
            upperLimit = levelRange.map(lvl => Math.floor((2 * stat.base_stat + IV_MAX + Math.floor(EV_MAX / 4)) * lvl / 100) + lvl + 10);
        } else {
            lowerLimit = levelRange.map(lvl => Math.floor((Math.floor((2 * stat.base_stat) * lvl / 100) + 5) * 0.9));
            upperLimit = levelRange.map(lvl => Math.floor((Math.floor((2 * stat.base_stat + IV_MAX + Math.floor(EV_MAX / 4)) * lvl / 100) + 5) * 1.1));
        }
        return [`${lowerLimit[0]} - ${upperLimit[0]}`, `${lowerLimit[1]} - ${upperLimit[1]}`];
    }

    return (
        <TableWrapper type={types[0].type.name} border={secondaryBorder}>
            <tbody>
                <tr className='header'>
                    <th colSpan='2' rowSpan='2'>
                        Stats
                                    </th>
                    <th colSpan='2'>
                        Range
                                    </th>
                </tr>
                <tr>
                    <th className='small'>
                        Lv. 50
                                    </th>
                    <th className='small'>
                        Lv.100
                                    </th>
                </tr>
                {stats.map((stat, idx) => {
                    return (
                        <StatRow key={stat.stat.name} statName={_.camelCase(stat.stat.name)}>
                            <th className='stat-label'>
                                <div>{`${statLabels[idx]}:`}</div>
                                <div>{`${stat.base_stat}`} </div>
                            </th>
                            <td className='progress-bar'><ProgressBar statName={_.camelCase(stat.stat.name)} value={stat.base_stat} /></td>
                            <td className='small'>{calcRangeValues(stat)[0]}</td>
                            <td className='small'>{calcRangeValues(stat)[1]}</td>
                        </StatRow>
                    )
                })}
                <tr style={{ textAlign: 'center' }}>
                    <th className='stat-label'>
                        <div>{`Total:`}</div>
                        <div>{`${stats.reduce((acc, cv) => acc + cv.base_stat, 0)}`}</div>
                    </th>
                    <td colSpan='3'></td>
                </tr>
                <tr>
                    <td colSpan='8' className='list-details'>
                        <ul>
                            <li>Minimum stats are calculated with 0 EVs, IVs of 0, and (if applicable) a hindering nature.</li>
                            <li>Maximum stats are calculated with 252 EVs, IVs of 31, and (if applicable) a helpful nature.</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </TableWrapper>
    )
}

export default StatTable;