import React from 'react';
import classes from './Buttons.module.css';


const Buttons = props => {
    switch(props.type) {
        case "next": return (
            <div className={classes.NextBtn}
                onClick={props.click} >
                <p>Next</p>
            </div> );
        case "goBack": return (
            <div className={classes.BackBtn}
                onClick={props.click} >
                <p>Go Back</p>
            </div> );
        case "showAll": return (
            <div className={classes.ShowAllBtn}
                onClick={props.click} >
                <p>Show All</p>
            </div> );
        default: return (
            <div className={classes.Button}
                onClick={props.click} >
                <p>{props.children}</p>
            </div> );
    }
}

export default Buttons;