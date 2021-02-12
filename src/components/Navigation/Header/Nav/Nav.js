import React from 'react';
import classes from './Nav.module.css';

import Item from './Item/Item';
import srcIcon from '../../../../assents/images/icons/search.png';

const Nav = (props) => {
    const navClasses = [classes.Nav],
        isActive = filter => props.activeFilter === filter && true;
            
    !props.showMobileNav && navClasses.push(classes.Hidden);
    
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
            </div>
            <div className={classes.Btn}>
                <div/><div/><div/>
                <div><img src={srcIcon} alt=""/></div>
            </div>
        </nav>
    );
}

export default Nav;