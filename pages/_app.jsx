import App from 'next/app'
import Head from 'next/head'

import { PokemonListProvider } from '../context/AppProvider'
import '../styles/globals.css';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <PokemonListProvider>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
                </Head>
                <Component {...pageProps} />
            </PokemonListProvider>
        )
    }
}