import React, { Component } from 'react';
import classes from './MoviesList.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux";

import * as actions from '../../../store/actions';
import Movie from './Movie/Movie';
import Buttons from '../../UI/Buttons/Buttons';


class MoviesList extends Component {
    constructor (props) {
        super(props);
        this.rowRef = React.createRef();
        this.onScroll = this.fetchMoreMovies.bind(this);
    }

    componentDidMount () {
        window.addEventListener('scroll', this.onScroll);
    }
    
    componentDidUpdate () {
        if (this.props.scrollTrigger) {
            !this.props.limit || this.props.showMoreDetails
                ? this.props.scrollTrigger.disable()
                : this.props.scrollTrigger.enable();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    handleSelectedMovie (id, movieId) {
        this.props.onSetActiveMovie(id);

        this.props.limit
            ? window.scroll(0, 0)
            : this.props.history.push("/movie/" + movieId);
    }
    
    fetchMoreMovies() {
        const limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight;

        (!this.props.limit && limit - window.scrollY < 100) &&
            this.props.onShowMoreMovies();
    }
    
    render () {
        let movies = this.props.movies.map((movie, key) => {
            return <Movie key={key} movie={movie}
                active={this.props.activeMovie === key ? true : false}
                click={ () => this.handleSelectedMovie(key, movie.id)} /> }),
            rowStyle = this.props.limit
                && {flexWrap: 'nowrap', width: '95%', transform: 'translate(0)'},
            moviesListClasses = [classes.MoviesList];

            this.props.showMoreDetails && moviesListClasses.push(classes.Hidden);

        return (
            <Container fluid="xxl" 
                id="moviesList"
                className={moviesListClasses.join(' ')} >
                <Row className={classes.MoviesRow} id="moviesRow" ref={this.rowRef}
                    style={{...rowStyle}} >
                    {movies}
                </Row>

                {this.props.limit &&
                    <Buttons type="showAll" 
                        className={classes.AllBtn} 
                        click={() => {
                            this.props.history.push("/movies/popular");
                            window.scroll(0, 0);
                        }}
                    />}
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeMovie: state.movies.activeMovie,
        showMoreDetails: state.navigation.showMovieDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveMovie: id => dispatch(actions.set_active_movie(id)),
        onShowMoreMovies: () => dispatch(actions.fetch_more_movies()),
        onShowAllMovies: show => dispatch(actions.show_all_movies(show)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MoviesList);