import classes from './MovieDetails.module.css';
import React from 'react';

import CastList from './CastList/CastList';


const MovieDetails = props => {
    return (
        <div className={classes.MovieDetails}>
            <h2>Overview</h2>
            <p>{props.movie.overview}</p>
            <CastList />
        </div>
    );
}

export default MovieDetails;