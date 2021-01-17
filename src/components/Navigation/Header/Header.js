import React from 'react';
import classes from './Header.module.css';
import Container from 'react-bootstrap/Container';

import Logo from './Logo/Logo';
import Nav from './Nav/Nav';

const Header = () => {
    return (
        <header className={classes.Header}>
            <Container className={classes.Container}>
                <Logo />
                <Nav />
            </Container>
        </header>
    );
}

export default Header;