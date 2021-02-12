import React from 'react';
import classes from './Item.module.css';
import { NavLink } from 'react-router-dom';

const Item = props => {
    const itemClasses = [classes.Item];

    props.active && itemClasses.push(classes.Active);
    props.search && itemClasses.push(classes.Search);
    props.showMobileNav && itemClasses.push(classes.ShowAll);
    
    return (
        <NavLink 
            to={props.link}
            exact={true}
            activeClassName={classes.Active}
            className={itemClasses.join(' ')}
            onClick = {props.clicked} >
            {props.children}
        </NavLink>
    );
}

export default Item;