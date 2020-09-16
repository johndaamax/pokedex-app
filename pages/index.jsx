import Head from 'next/head'

import Layout from '../components/Layout/Layout'


const Home = () => {

    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <h1>
                Welcome!
                </h1>
            <p>Welcome to the pokedex app!</p>
            <p>Navigate to the pokedex link to start searching!</p>
        </Layout>
    )
}

export default Home;