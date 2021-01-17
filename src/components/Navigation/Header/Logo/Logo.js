import React from 'react';
import classes from './Logo.module.css';

import logo from '../../../../logo.svg';


const Logo = () => {
    return (
        <a href='/' className={classes.Logo}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>My Movie DB</p>
        </a>
    );
}

export default Logo;