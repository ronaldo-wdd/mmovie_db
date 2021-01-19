import React from 'react';
import classes from "./Media.module.css";

import Backdrop from './Backdrop/Backdrop';


const Media = () => {
    return (
        <div className={classes.Media}>
            <Backdrop />
        </div>
    );
}

export default Media;