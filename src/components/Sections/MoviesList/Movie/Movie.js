import React from 'react';
import classes from './Movie.module.css';
import Col from 'react-bootstrap/Col';

import defaultPosterPath from '../../../../assents/images/defaultPoster.jpg';


const Movie = props => {
    const movie = props.movie;
    let colClasses = [classes.Col];
    props.active && colClasses.push(classes.Active);

    return (
        <Col xs="6" sm="4" md="3" lg="2" 
            ref={props.ref}
            className={colClasses.join(' ')}
            onClick={props.click} >
            <div className={classes.Movie}>
                <img alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                    onError = {e => e.target.src = defaultPosterPath} />
            </div>
        </Col>
    );
}

export default Movie;