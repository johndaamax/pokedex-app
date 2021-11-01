import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: relative;
    display: inline-block;

    .tooltiptext {
        visibility: hidden;
        width: 165px;
        max-height: 250px;
        text-overflow: ellipsis;
        background-color: black;
        color: #fff;
        text-align: center;
        text-transform: none;
        border-radius: 6px;
        padding: 0.4em;
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%;
        margin-left: -80px;
        font-size: 13px;
        line-height: 16px;
        opacity: 0;
        transition: opacity 1s;
    }

    &:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
`

const Tooltip = ({ children, text }) => {
    return (
        <Wrapper className="tooltip">
            {children}
            <span className="tooltiptext">{text}</span>
        </Wrapper>
    )
}

export default Tooltip
