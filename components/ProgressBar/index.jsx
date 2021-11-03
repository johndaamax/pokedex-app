import React from "react";
import styled from 'styled-components'

import { statColors } from '../../styles/styles'

const Filler = styled.div`
    height: 0.75em;
    width: calc(100% * ${props => props.value}/255);
    background-color: ${props => statColors[props.statName]};
    text-align: right;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,.15);
`;

const ProgressBar = ({ statName, value }) => {
    return (
        <Filler statName={statName} value={value} />
    );
};

export default ProgressBar;