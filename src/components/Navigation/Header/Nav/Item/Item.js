import React from 'react';
import classes from './Item.module.css';

const Item = (props) => {
    const itemClasses = [classes.Item]
    props.active && itemClasses.push(classes.Active);
    
    return (
        <div className={itemClasses.join(' ')}>
            {props.children}
        </div>
    );
}

export default Item;