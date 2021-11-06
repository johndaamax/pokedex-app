import Head from 'next/head'
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import { WrapperDiv } from '../styles/shared'
import ImageOpt from '../util/ImageOpt'
import errorImage from '../public/static/error.png'

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding-bottom: 1rem;
    transition: all 0.5s ease;

    img {
        width: 25%;
        min-width: 300px;
    }
    h1, h2 {
        margin: 0;
    }

    a, span {
        min-width: 120px;
        margin: 0 1rem;
        padding: 1rem 0.5rem;
        border-radius: 10px;
        border: 2px solid #232323;
        cursor: pointer;
        &:hover {
            background: #232323;
            color: #fff;
        }
    }

    .fluff-text {
        margin: 0;
        padding: 0 1rem;
    }

    .jumbo {
        font-size: 156px;
        letter-spacing: 0.1em;
        @media (max-width: 768px) {
            font-size: 132px;
            min-width: 320px;
        } 
    }
    .jumbo-desc {
        font-size: 32px;
        margin-top: -1.2rem;
        @media (max-width: 768px) {
            font-size: 28px;
            margin-top: -1rem;
        }
    }
    .links {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
`;

const Error = () => {
    const router = useRouter()

    return (
        <Layout>
            <WrapperDiv>
                <Head>
                    <title>Error</title>
                </Head>
                <ErrorContainer>
                    <ImageOpt source={errorImage} alt='404-image' />
                    <h1 className='jumbo'>404</h1>
                    <h2 className='jumbo-desc'>Pokemon not found</h2>
                    <p className='fluff-text'>It seems that the page you were looking for could not be found!</p>
                    <div className='links'>
                        <Link href='/'><a>Home</a></Link>
                        <span onClick={() => router.back()}>Go Back</span>
                    </div>
                </ErrorContainer>
            </WrapperDiv>
        </Layout>
    )
}

export default Error;