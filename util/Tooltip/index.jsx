import React from 'react';
import styled from 'styled-components';

import ImageOpt from '../ImageOpt';

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-left: 0.2em;

    .tooltiptext {
        visibility: hidden;
        width: 145px;
        max-height: 250px;
        text-overflow: ellipsis;
        overflow-y: auto;
        background-color: black;
        color: #fff;
        text-transform: none;
        border-radius: 6px;
        padding: 0.4em;
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%;
        margin-left: -100px;
        font-size: 0.75rem;
        line-height: 16px;
        opacity: 0;
        transition: opacity 1s;
        ::-webkit-scrollbar {
            width: 0.5em;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 6px;
        }
    }

    &:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
`;

const Tooltip = ({ text }) => {
    return (
        <Wrapper className="tooltip">
            <ImageOpt src='/static/help-18.png' alt='question mark tooltip icon' width={18} height={18} />
            <span className="tooltiptext">{text}</span>
        </Wrapper>
    )
}

export default Tooltip
