import styled from 'styled-components';
import _ from 'lodash';

import ProgressBar from '../ProgressBar';
import { statBackgroundColors } from '../../styles/styles';

const Table = styled.table`
    white-space: nowrap;
    border-radius: 4px;
    background: white;
    margin-bottom: 0.5em;

    @media (max-width: 1096px) {
        font-size: 0.8em;
    }

    th {
        text-align: right;
    }

    th, td {
        padding: 0.4em 0.85em;
    }

    .cell-val {
        text-align: center;
        padding: 0.05em 0.15em;
    }

    .cell-barchart {
        width: 100%;
        min-width: 130px;
    }

    .cell-label {
        color: #737373;
    }
`;

const StatTable = ({ stats }) => {
    const statLabels = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];

    function calcRangeValues(statName, statValue) {
        //function to calculate the highest and lowest possible stat ranges at lvl. 50 and 100
        const levelRange = [50, 100];
        const EV_MAX = 252, IV_MAX = 31;
        let lowerBound, upperBound;
        if (statName === 'hp') {
            lowerBound = levelRange.map(lvl => Math.floor((2 * statValue) * lvl / 100) + lvl + 10);
            upperBound = levelRange.map(lvl => Math.floor((2 * statValue + IV_MAX + Math.floor(EV_MAX / 4)) * lvl / 100) + lvl + 10);
        } else {
            lowerBound = levelRange.map(lvl => Math.floor((Math.floor((2 * statValue) * lvl / 100) + 5) * 0.9));
            upperBound = levelRange.map(lvl => Math.floor((Math.floor((2 * statValue + IV_MAX + Math.floor(EV_MAX / 4)) * lvl / 100) + 5) * 1.1));
        }
        return [`${lowerBound[0]}-${upperBound[0]}`, `${lowerBound[1]}-${upperBound[1]}`];
    }

    return (
        <Table>
            <tbody>
                {stats.map(({ stat, value }, idx) => (
                    <tr key={stat.name}>
                        <th title={`${statLabels[idx]}`} className='cell-label'>{`${statLabels[idx]}:`}</th>
                        <td title={value} className='cell-val'>{value}</td>
                        <td className='cell-barchart'>
                            <ProgressBar statName={stat.name} value={value} />
                        </td>
                        <td className='lower-bound cell-val'>{calcRangeValues(stat.name, value)[0]}</td>
                        <td className='upper-bound cell-val'>{calcRangeValues(stat.name, value)[1]}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th title='Total' className='cell-label'>Total:</th>
                    <td className='cell-val'>{stats.reduce((acc, cv) => acc + cv.value, 0)}</td>
                    <td className='cell-barchart'></td>
                    <td className='cell-val cell-label'>At Lv. 50</td>
                    <td className='cell-val cell-label'>At Lv. 100</td>
                </tr>
            </tfoot>
        </Table>
    )
}

export default StatTable;