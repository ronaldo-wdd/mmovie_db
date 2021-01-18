import React from 'react';
import classes from './Item.module.css';
// import {NavLink} from 'react-router-dom';

const Item = (props) => {
    const itemClasses = [classes.Item]
    props.active && itemClasses.push(classes.Active);
    props.showMobileNav && itemClasses.push(classes.ShowAll);
    
    return (
        <div 
            className={itemClasses.join(' ')}
            onClick = {props.clicked} >
            {props.children}
        </div>
    );
}

export default Item;