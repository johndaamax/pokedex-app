import Header from '../Header/Header';
import styled from 'styled-components'
import Link from 'next/link'

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
    background: url('/static/cover.jpg');
    background-repeat: repeat;

    .wrapper {
        width: 90%;
        margin: 0 auto;
        background: radial-gradient(180deg, rgba(255, 255, 255, 0.95) 25%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.85) 75%, rgba(255, 255, 255, 0.8) 100%);
        padding: 1em 0;
        @media (max-width: 768px) {
            width: 100%;
        }
        @media (min-width: 768px) {
            padding: 0.5rem 1rem;
        }
    }

    footer {
        margin-top: auto;
        padding: 0.5rem 1rem 1rem;
        background-color: #232323;
        color: #C1C1C1;
        min-width: 370px;
        width: 100%;

        .main-footer-bar {
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 16px;
            flex-wrap: wrap;
            padding-top: 0.4em;
        }

        .footer-text {
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
        }

        .author-information {
            margin: 0.5rem 0;
            text-align: center;

            span:first-of-type {
                margin-right: 0.8rem;
            }
        }

        .external-links {
            padding-left: 0.4rem;
            color: #4060E7;
            &:hover {
                color: #C1C1C1;
            }
        }
    }
`

const Layout = ({ children }) => {

    return (
        <PageContainer>
            <Header />
            {children}
            <footer>
                <div className='main-footer-bar'>
                    <span className='footer-text'> Powered by
                        <Link href={'https://nextjs.org/'}>
                            <a>
                                <img id='next' src='/static/next.png' />
                            </a>
                        </Link>
                © 2020 - 2021
                </span>
                    <span className='footer-text'> Data provided by  <Link href={'https://pokeapi.co'}>
                        <a>
                            <img src='/static/pokeapi.png' />
                        </a>
                    </Link>
                    </span>
                </div>
                <div>
                    <p className='author-information'>
                        <span>
                            Developed by:
                            <span className='external-links'>
                                <Link href='https://github.com/johndaamax'><a>johndaamax</a></Link>
                            </span>
                        </span>
                        <span className='external-links'>
                            <Link href='https://github.com/johndaamax/pokedex-app'><a>Project source code</a></Link>
                        </span>
                    </p>
                </div>
            </footer>
        </PageContainer>
    )
}

export default Layout;