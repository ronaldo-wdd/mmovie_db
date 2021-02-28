import classes from './MovieDetails.module.css';
import React from 'react';

import CastList from './CastList/CastList';


const MovieDetails = props => {
    const releaseDate = new Date(props.movie.release_date),
        currDate = new Date();

    let date = releaseDate > currDate 
        ? "Release date: " + props.movie.release_date
        : props.movie.release_date.split('-')[0];
    
    return (
        <div className={classes.MovieDetails}>
            <div className={classes.Others}>
                <h2>{props.movie.original_language}</h2>
                <h2>{date}</h2>
            </div>
            <h2>Overview</h2>
            <p>{props.movie.overview}</p>
            <CastList
                onTouchStart = {props.onTouchStart}
                handleScroll = {props.handleScroll}
                deltaX = {props.deltaX}
                maxDeltaX = {props.maxDeltaX} />
        </div>
    );
}

export default MovieDetails;