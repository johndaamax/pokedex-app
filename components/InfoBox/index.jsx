import styled from 'styled-components'

const Container = styled.div`
    text-align: center;
    margin: 0 auto;
    text-transform: capitalize;
`

const Div = styled.div`
    border: 1px solid hsl(0,0%,80%);
    border-radius: 8px;
    background: #fff;
    display: flex;
    padding: 0.3rem;
    justify-content: center;
    flex-wrap: wrap;
`

const InfoBox = ({ type, children }) => {
    return (
        <Container>
            <strong>{type}</strong>
            <Div >
                {children}
            </Div>
        </Container>
    )
}

export default InfoBox;