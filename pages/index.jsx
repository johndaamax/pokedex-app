import Head from 'next/head'

import Layout from '../components/Layout/Layout'
import { Wrapper } from '../styles/shared'

const Home = () => {

    return (
        <Layout>
            <Wrapper>
                <Head>
                    <title>Home</title>
                </Head>
                <h1>
                    Welcome!
                </h1>
                <p>Welcome to the pokedex app!</p>
                <p>Navigate to the pokedex link to start searching!</p>
            </Wrapper>
        </Layout>
    )
}

export default Home;