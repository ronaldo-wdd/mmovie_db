import React from 'react';
import classes from './Movie.module.css';
import Col from 'react-bootstrap/Col';

import defaultPosterPath from '../../../../assents/images/defaultPoster.jpg';


const Movie = props => {
    const movie = props.movie;
    let movieClasses = [classes.Movie];
    props.active && movieClasses.push(classes.Active);

    return (
        <Col xs="6" sm="4" md="3" lg="2" 
            ref={props.ref}
            className={movieClasses.join(' ')}
            onClick={props.click} >
            <img alt={movie.title}
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                onError = {e => e.target.src = {defaultPosterPath}} />
        </Col>
    );
}

export default Movie;