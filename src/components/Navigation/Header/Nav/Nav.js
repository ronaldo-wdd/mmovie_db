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
                        active={props.activeFilter === 'popular'}
                        clicked = {() => props.handleNavLinksClick('popular')}
                        showMobileNav={props.showMobileNav} >
                        <p>Popular</p>
                        <div className={classes.Span} /></Item>
                    <Item 
                        link="/"
                        active={props.activeFilter === 'now_playing'}
                        clicked = {() => props.handleNavLinksClick('now_playing')}
                        showMobileNav={props.showMobileNav} >
                        <p>In theatres</p>
                        <div className={classes.Span} /></Item>
                    <Item 
                        link="/"
                        active={props.activeFilter === 'upcoming'} 
                        clicked = {() => props.handleNavLinksClick('upcoming')}
                        showMobileNav={props.showMobileNav} >
                        <p>Up Coming</p>
                        <div className={classes.Span} /></Item>
                </div>
                <Item 
                    link="/search"
                    showMobileNav={props.showMobileNav}>
                    <p>Search</p>
                    <img src={srcIcon} alt="" /></Item>
            </div>
        </nav>
    );
}

export default Nav;