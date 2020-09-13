import Head from 'next/head'

import Layout from '../components/Layout/Layout'

const Home = () => {

    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <h1>
                Home page
            </h1>
            <div class="content">
                <h1>A webpage</h1>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium augue quis augue ornare tempor. Donec eu purus vitae nisi eleifend euismod. Nullam sem nunc, bibendum tempor iaculis eu, consequat in sem. Phasellus nec molestie orci. Fusce varius nisi est, non aliquet dolor porttitor non. Aliquam eu ante nec massa pulvinar posuere. Praesent consectetur porttitor ipsum, eget viverra urna ultricies et.</p>
                <p>Quisque vehicula neque a enim dignissim, et vestibulum orci viverra. Pellentesque aliquam feugiat interdum. Ut molestie vitae lacus in eleifend. Sed scelerisque urna ut elit venenatis suscipit. Nullam nec urna vel enim mattis interdum ut consequat libero. Proin in imperdiet orci. Vivamus felis lacus, dictum ac eros eu, malesuada pretium nisi. Cras suscipit nunc magna, a egestas neque facilisis sed.</p></div>
        </Layout>
    )
}

export default Home;