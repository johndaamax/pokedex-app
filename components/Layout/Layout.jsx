import Header from '../Header/Header';
import styled from 'styled-components'
import Link from 'next/link'

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
`
const Footer = styled.footer`
    margin-top: auto;
    background-color: #232323;
    color: #b2b2b2;
    min-width: 370px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    flex-wrap: wrap;
    padding-top: 0.4em;
`
const FooterText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 1em;

    #next {
        -webkit-filter: invert(100%);
        filter: invert(100%);
    }
    img {
        height: 40px;
        width: auto;
        margin: 0 0.5em;
    }
`
const Layout = ({ children }) => {

    return (
        <PageContainer>
            <main>
                <Header />
                {children}
            </main>
            <Footer>
                <FooterText>Powered by
                <Link href={'https://nextjs.org/'}>
                        <a>
                            <img id='next' src='/static/next.png' />
                        </a>
                    </Link>
                © 2020
                </FooterText>
                <FooterText> Data provided by  <Link href={'https://pokeapi.co'}>
                    <a>
                        <img src='/static/pokeapi.png' />
                    </a>
                </Link>
                </FooterText>
            </Footer>
        </PageContainer>
    )
}

export default Layout;