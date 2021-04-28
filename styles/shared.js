import styled from 'styled-components'

const WrapperDiv = styled.div`
    width: 100%;
    margin: 0 auto;
    background: ${props => props.color !== 'default' ?
        `radial-gradient(circle at center, ${props.color} 50%, rgba(255, 255, 255, 0.85) 100%);`
        : `radial-gradient(circle at center, rgba(200, 200, 200, 0.95) 50%, rgba(255, 255, 255, 0.90) 100%);`
    }
    padding: 1rem;
    @media (max-width: 768px) {
        width: 100%;
    }
    @media (min-width: 768px) {
        padding: 0.5rem 2rem;
    }
`

export const Wrapper = ({ color = 'default', children }) => {
    return <WrapperDiv color={color}>{children}</WrapperDiv>
}
