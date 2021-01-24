import React from 'react';
import classes from './MainMovie.module.css';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import Info from './Info/Info';
import playBtn from '../../../assents/svg/play.svg';


const MainMovie = props => {
    const movie = props.movies[props.activeMovie];
    
    return (
        <div className={classes.MainMovie}>
            {props.isMobile
                ? !props.loading &&
                    <Container fluid="xxl" className={classes.Info}>
                        <img src={playBtn} alt="" />
                        <h1>{movie.title}</h1>
                    </Container>
                : !props.loading && <Info mobile={false} />
            }
        </div>
    );
}


const mapStateToProps = state => {
    return {
        isMobile: state.navigation.mobile,
        loading: state.navigation.loading,
        movies: state.movies.movies,
        activeMovie: state.movies.activeMovie
    }
}

export default connect(mapStateToProps)(MainMovie);