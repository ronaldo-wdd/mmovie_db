import React from 'react';
import classes from './MoviesList.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Movie from './Movie/Movie';

const MoviesList = () => {
    return (
        <div className={classes.MoviesList}>
            <Row>
                <Col xs="2"><Movie /></Col>
                <Col xs="2"><Movie /></Col>
                <Col xs="2"><Movie /></Col>
                <Col xs="2"><Movie /></Col>
                <Col xs="2"><Movie /></Col>
                <Col xs="2"><Movie /></Col>
            </Row>
        </div>
    );
}

export default MoviesList;