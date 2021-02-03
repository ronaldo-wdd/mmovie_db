import React from 'react';
import classes from './Buttons.module.css';


const Buttons = props => {
    switch(props.type) {
        case "next": return (
            <div className={[classes.NextBtn, props.className].join(' ')}
                onClick={props.click} >
                <p>Next</p>
            </div> );
        case "goBack": return (
            <div className={[classes.BackBtn, props.className].join(' ')}
                onClick={props.click} >
                <p>Go Back</p>
            </div> );
        case "showAll": return (
            <div className={[classes.ShowAllBtn, props.className].join(' ')}
                onClick={props.click} >
                <p>Show All</p>
            </div> );
        default: return (
            <div className={[classes.Button, props.className].join(' ')}
                onClick={props.click} >
                <p>{props.children}</p>
            </div> );
    }
}

export default Buttons;