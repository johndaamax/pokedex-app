import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
    max-height: 70vh;
    padding: 0.2rem 0.7rem;
    overflow: auto;
    border: 1px solid #999999;
    border-radius: 10px;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #232323;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
`
const Item = styled.p`
    height: 38px;
    border-radius: 24px;
    margin: 8px auto;
    padding: 0.6em;
    background: rgba(221,221,221, 0.8);
    text-align: center;
    font-size: 18px;
    text-transform: capitalize;
    transition: all 0.4s linear;

    &:hover {
        background: #232323;
        color: #fff;
        cursor: pointer;
        transform: scale(1.03);
        z-index:10;
        font-weight: bold;
    }
`

const PokedexContainer = ({ list }) => {

  return (
    <Container>
      {list.map((item, i) => <Link key={i} href={`${item.url.substr(item.url.indexOf('/pokemon/'))}`}><Item>#{`${item.url.substr(item.url.indexOf('/pokemon/')).replace(/[^0-9]/g, '')}`} {item.name}</Item></Link>)}
    </Container>
  )
}

export default PokedexContainer;