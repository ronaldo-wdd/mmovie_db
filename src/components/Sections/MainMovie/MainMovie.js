import React from 'react';
import classes from './MainMovie.module.css';

import Media from './Media/Media';
import Info from './Info/Info';


const MainMovie = () => {
    return (
        <div className={classes.MainMovie}>
            <Media />
        </div>
    );
}

export default MainMovie;