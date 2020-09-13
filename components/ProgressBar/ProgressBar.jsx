import React from "react";
import styled from 'styled-components'

import { statColors } from '../../util/styles'

const Filler = styled.div`
    height: 20px;
    width: calc(100% * ${props => props.value}/255);
    background-color: ${props => statColors[props.statName]};
    text-align: right;
    border: 1px solid #A60000;
`

const ProgressBar = ({ statName, value }) => {
    return (
        <Filler statName={statName} value={value} />
    );
};

export default ProgressBar;