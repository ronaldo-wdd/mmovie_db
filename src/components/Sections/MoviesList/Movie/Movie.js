import React from 'react';
import classes from './Movie.module.css';

import moviePoster from '../../../../assents/images/poster.jpg';

const Movie = () => {
    return (
        <div className={classes.Movie}>
            <img src={moviePoster} alt="" title="" />
        </div>
    );
}

export default Movie;