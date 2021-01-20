import React from 'react';
import classes from './Nav.module.css';

import Item from './Item/Item'
import srcIcon from '../../../../assents/images/icons/search.png';

const Nav = (props) => {
    const navClasses = [classes.Nav];
    !props.showMobileNav && navClasses.push(classes.Hidden);

    return ( 
        <nav className={navClasses.join(' ')}>
            <div className={classes.Ul} onClick={()=> props.clicked()}>
                <div className={classes.Filters}>
                    <Item 
                        link="/"
                        active={props.activeFilter == 1}
                        clicked = {() => props.handleNavLinksClick(1)}
                        showMobileNav={props.showMobileNav} >
                        <p>Cinema</p>
                        <div className={classes.Span} /></Item>
                    <Item 
                        link="/"
                        active={props.activeFilter == 2}
                        clicked = {() => props.handleNavLinksClick(2)}
                        showMobileNav={props.showMobileNav} >
                        <p>Streaming</p>
                        <div className={classes.Span} /></Item>
                    <Item 
                        link="/"
                        active={props.activeFilter == 3} 
                        clicked = {() => props.handleNavLinksClick(3)}
                        showMobileNav={props.showMobileNav} >
                        <p>Up Coming</p>
                        <div className={classes.Span} /></Item>
                </div>
                <Item 
                    link="/search"
                    showMobileNav={props.showMobileNav}>
                    <p>Search</p>
                    <img src={srcIcon} /></Item>
            </div>
        </nav>
    );
}

export default Nav;