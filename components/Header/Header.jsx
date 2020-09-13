import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'

const LayoutDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: #232323;

  .menu-icon-container {
    position: absolute;
    top: 16px;
    right: 0;
    display: none;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    @media (max-width: 768px) {
      display: flex;
    }
  }
  .menu-icon {
    display: grid;
    place-items: center;
    height: 25px;
    width: 25px;
    cursor: pointer;

    & > span {
      width: 25px;
      height: 3px;
      border-radius: 15px;
      background: white;
      display: block;
      transition: all 0.3s ease-in-out;
    }
    &:hover span:nth-child(1) {
      width: 8px;
    }
  
    &:hover span:nth-child(2) {    
      width: 16px;
    }

    &.active span:nth-child(1) {
      transform-origin: center center;
      transform: rotate(-45deg) translate(-12px, 12px);
      width: 55px;
    }
  
    &.active span:nth-child(2) {
      transform: translateX(10px);
      opacity: 0;
    }
  
    &.active span:nth-child(3) {
      transform-origin: center center;
      transform: rotate(45deg) translate(-15px, -14px);
      width: 55px;
    }
  }
  .line-1 {
    width: 35px;
    justify-self: end;
  }
  
  .line-2 {
    width: 35px;
    justify-self: end;
  }

  .mobile-links {
    display: ${props => props.toggle ? 'block' : 'none'};
    @media (min-width: 768px) {
      display: none;
    }
  }
  @media (min-width: 768px) {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }
`
const AppTitle = styled.h1`
  display: inline-block;
  margin: 0;
  padding: 0.5rem;
  font-weight: 100;
  color: #fff;
  img {
    margin-right: 0.3rem;
    height: 32px;
    width: 32px;
  }
`
const Nav = styled.nav`
  //float: right;
  position: relative;
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  color: #fff;

  .links{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
      display: none;
  }
`
const TestLink = styled.a`
  color: #FFF;
  text-align: center;
  font-size: 16px;
  min-width: max-content;
  text-decoration: none;
  margin: 0 1em;
  padding: 0 1em;
  height: 3.125rem;
  line-height: 3.125rem;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    display: block;
    margin: 0;
    
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      text-decoration: none;
      font-size: 28px;
    }
  }
`
const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const links = [
    <Link key='home' href='/'><TestLink>Home</TestLink></Link>,
    <Link key='about' href='/about'><TestLink>About</TestLink></Link>,
    <Link key='pokedex' href='/pokedex'><TestLink>Pokedex</TestLink></Link>
  ];

  return (
    <LayoutDiv toggle={isVisible}>
      <Head>
        <title>PokeApp</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Link href='/'>
        <a>
          <AppTitle>
            <img src='/static/pokeapp.png' alt='pokeapp_logo' />
            PokeApp
          </AppTitle>
        </a>
      </Link>
      <Nav>
        <div className='links'>
          {links}
        </div>
      </Nav>
      <div className="menu-icon-container" onClick={() => setIsVisible(!isVisible)}>
        <div className="menu-icon">
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
        </div>
      </div>
      <div className='mobile-links'>
        {links}
      </div>
    </LayoutDiv>
  )
}

export default Header;