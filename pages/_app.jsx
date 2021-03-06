import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { PokemonListProvider } from '../context/AppProvider'
import '../styles/globals.css';

const theme = {
    colors: {
        primary: '#0070f3',
    },
}

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <PokemonListProvider>
                <Head>
                    <meta name="theme-color" content="#317EFB" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
                </Head>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </PokemonListProvider>
        )
    }
}