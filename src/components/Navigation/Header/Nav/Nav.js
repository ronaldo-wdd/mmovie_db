import React from 'react';
import classes from './Nav.module.css';

import Item from './Item/Item';
import srcIcon from '../../../../assents/images/icons/search.png';
import profileIcon from '../../../../assents/images/icons/profile.png';

const Nav = (props) => {
    const navClasses = [classes.Nav],
        srcClasses = [classes.Search],
        profileClasses = [classes.Profile],
        pathname = props.pathname,
        isActive = filter => props.activeFilter === filter;
            
    !props.showMobileNav && navClasses.push(classes.Hidden);
    pathname === 'search' && srcClasses.push(classes.Active);
    pathname === 'profile' && profileClasses.push(classes.Active);
    
    return ( 
        <nav className={navClasses.join(' ')} onClick={()=> props.clicked()}>
            <div className={classes.Close} onClick={()=> props.clicked()} />
            <div className={classes.Items}>
                <Item active={isActive('popular')}
                    link="/movies/popular"
                    clicked = {() => props.handleNavLinksClick('popular')}
                    showMobileNav={props.showMobileNav} >
                    Popular</Item>
                <Item active={isActive('now_playing')}
                    link="/movies/in-theatres"
                    clicked = {() => props.handleNavLinksClick('now_playing')}
                    showMobileNav={props.showMobileNav}>
                    In theatres</Item>
                <Item active={isActive('upcoming')} 
                    link="/movies/upcoming"
                    clicked = {() => props.handleNavLinksClick('upcoming')}
                    showMobileNav={props.showMobileNav}>
                    Up Coming</Item>
                <Item link="/search"
                    showMobileNav={props.showMobileNav}
                    search={true}>
                    Search</Item>
                <Item link="/login"
                    showMobileNav={props.showMobileNav}
                    search={true} >
                    Login</Item>
            </div>
            <div className={classes.Btn}>
                <div/><div/><div/>
                <div><img className={srcClasses.join(' ')} src={srcIcon} alt=""/></div>
                <div><img className={profileClasses.join(' ')} src={profileIcon} alt=""/></div>
            </div>
        </nav>
    );
}

export default Nav;