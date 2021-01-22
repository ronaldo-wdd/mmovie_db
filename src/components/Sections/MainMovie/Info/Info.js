import React from 'react';
import classes from './Info.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';

import starIcon from '../../../../assents/images/icons/star.png';
import Button from '../../../UI/Buttons/Buttons';
import playBtn from '../../../../assents/svg/play.svg';


const Info = props => {
    const movie = props.movies[props.activeMovie],
        vote = movie.vote_average,
        stars = [2,4,6,8,10].map((value, index) => {
            return <img key={index}
                src={starIcon} 
                alt="" 
                style={{
                    opacity: vote - value >= -1 
                    ? 1 
                    : '.3'}} />;
        }),
        movieGenres = movie.genre_ids.map((id, index) => {
            return <li key={index}>{props.genresList[id]}</li>
        });

    
    return (
        <Container className={classes.Info}
            fluid="xxl" 
            style={props.mobile ? {height: 'auto'} : {height: '70vh'}} >
            <Col sm="12" md="5" className={classes.Main}>
                <h1>{movie.title}</h1>
                <ul>{movieGenres}</ul>
                <div className={classes.Stars}>
                    {stars}
                    <p>{vote*10}%</p>
                </div>
                <Button>See more</Button>
            </Col>
            <Col md="7" className={classes.PlayTrailer}>
                <img src={playBtn} alt="" />
            </Col>
            <Container fluid="xxl" className={classes.NextBtn}>
                <Button type="next"
                    click={ ()=> props.onSetActiveMovie(props.activeMovie + 1)}/>
            </Container>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        genresList: state.movies.genresList,
        activeMovie: state.movies.activeMovie,
        loading: state.navigation.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveMovie: index => dispatch(actions.active_movie(index))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Info);