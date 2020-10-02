import styled from 'styled-components'

const WrapperDiv = styled.div`
    width: 90%;
    margin: 0 auto;
    background: ${props => props.color !== 'default' ?
        `linear-gradient(180deg, ${props.color} 50%, rgba(255, 255, 255, 0.70) 100%);`
        : `linear-gradient(180deg, rgba(200, 200, 200, 0.95) 50%, rgba(255, 255, 255, 0.90) 100%);`
    }
    padding: 1em 0;
    @media (max-width: 768px) {
        width: 100%;
    }
    @media (min-width: 768px) {
        padding: 0.5rem 1rem;
    }
`

export const Wrapper = ({ color = 'default', children }) => {
    return <WrapperDiv color={color}>{children}</WrapperDiv>
}
