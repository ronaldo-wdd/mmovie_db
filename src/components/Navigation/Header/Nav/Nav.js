import React from 'react';
import classes from './Nav.module.css';

import Item from './Item/Item'
import srcIcon from '../../../../assents/images/icons/search.png';

const Nav = () => {
    return (
        <nav className={classes.Nav}>
            <div className={classes.Ul}>
                <div className={classes.Filters}>
                    <Item active={true}>
                        <p>Cinema</p>
                        <div className={classes.Span} /></Item>
                    <Item>
                        <p>Streaming</p>
                        <div className={classes.Span} /></Item>
                    <Item>
                        <p>Up Coming</p>
                        <div className={classes.Span} /></Item>
                </div>
                <Item>
                    <p>Search</p>
                    <img src={srcIcon} /></Item>
            </div>
        </nav>
    );
}

export default Nav;