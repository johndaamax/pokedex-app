import Head from 'next/head'
import Link from 'next/link'

import Layout from '../components/Layout/Layout'


const About = () => {
    return (
        <Layout>
            <Head>
                <title>About</title>
            </Head>

            <h1>About page</h1>
            <p>
                Developed by: johndaamax
            </p>
            <p>
                Github link: <Link href='https://github.com/johndaamax'><a>Github</a></Link>
            </p>

            <p>
                Source code of the project! Give it a star if you'd like: <Link href='https://github.com/johndaamax/pokedex-app'><a>Link</a></Link>
            </p>
        </Layout>
    )
}

export default About;