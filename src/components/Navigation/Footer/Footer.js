import React from 'react';
import classes from './Footer.module.css';
import Container from 'react-bootstrap/Container';

import srLogo from '../../../assents/images/icons/rsLogo.png';
import reactLogo from '../../../assents/images/icons/react.png';

const Footer = ()=> {
    return (
        <div id = 'footer'
            className = {classes.Footer}>
            <Container fluid="xxl" className={classes.Cont}>
                <a href="https://www.themoviedb.org/" target="black">
                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="Ronaldo" />
                    <p>The Movie Database</p>
                    <h3>Powered by</h3>
                <a href="https://ronaldosilva.website/" target="black">
                    <img src={srLogo} alt="Ronaldo" />
                    <p>Ronaldo</p>
                    <h3>Made by</h3>
                </a>
                <a href="https://reactjs.org/" target="black">
                    <img src={reactLogo} alt="Ronaldo" />
                    <p>React JS</p>
                    <h3>With</h3>
                </a>
                </a>
            </Container>
        </div>
    );
}

export default Footer;