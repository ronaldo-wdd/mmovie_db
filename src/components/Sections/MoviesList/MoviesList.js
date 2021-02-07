import React, { Component } from 'react';
import classes from './MoviesList.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux";
import { animateScroll } from 'react-scroll';

import * as actions from '../../../store/actions';
import Movie from './Movie/Movie';
import Buttons from '../../UI/Buttons/Buttons';


class MoviesList extends Component {
    constructor (props) {
        super(props);
        this.rowRef = React.createRef();
        this.containerRef = React.createRef();
    }

    state = { gsapAnim: null, movies: [] }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)) 
            ? true : false;
    }
    
    componentDidMount () {
        let movies = [];

        setTimeout(() => {
            this.props.history.location.pathname === '/movies'
                ? movies = this.props.movies
                : movies = this.props.movies.slice(0, 10);
            this.setState({movies: movies});
        }, 300);
    }

    componentWillUnmount() {
        const position = - (this.containerRef.current.getBoundingClientRect().top - 100); 
        this.props.onUpdateScrollP(position);
    }
    
    componentDidUpdate () {
        let movies = [];

        this.props.history.location.pathname === '/movies'
            ? movies = this.props.movies
            : movies = this.props.movies.slice(0, 10);

        this.setState({movies: movies});

        if (this.props.scrollTrigger == null) return; //
        this.props.showAll || this.props.showMoreDetails
            ? this.props.scrollTrigger.disable()
            : this.props.scrollTrigger.enable();
    }

    handleShowAll (opened) {
        opened 
            ? this.props.history.goBack()
            : this.props.history.push("/movies");
    }

    handleSelectedMovie (id, movieId) {
        this.props.onSetActiveMovie(id);

        this.props.showAll
            ? this.props.history.push("/movie/" + movieId)
            : animateScroll.scrollToTop({ smooth: true }); 
    }
    
    
    render () {
        let movies = this.state.movies.map((movie, key) => {
            return <Movie key={key} movie={movie}
                active={this.props.activeMovie === key ? true : false}
                click={ () => this.handleSelectedMovie(key, movie.id)} /> }),
            rowStyle = !this.props.showAll
                && {flexWrap: 'nowrap', width: '95%', transform: 'translate(0)'},
            moviesListClasses = [classes.MoviesList];

            this.props.showMoreDetails && moviesListClasses.push(classes.Hidden);

        return (
            <Container fluid="xxl" 
                id="moviesList"
                ref={this.containerRef}
                className={moviesListClasses.join(' ')} >
                <Row className="moviesRow" ref={this.rowRef}
                    style={{...rowStyle}} >
                    {movies}
                </Row>

                {this.props.showAll  
                    ? <Buttons type="goBack" 
                        className={classes.BackBtn} 
                        click={() => this.handleShowAll(true)} />
                    : <Buttons type="showAll" 
                        className={classes.AllBtn} 
                        click={() => this.handleShowAll(false)} />}
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeMovie: state.movies.activeMovie,
        showAll: state.navigation.showAllMovies,
        movies: state.movies.movies,
        showMoreDetails: state.navigation.showMovieDetails,
        isMobile: state.navigation.mobile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveMovie: id => dispatch(actions.set_active_movie(id)),
        onShowAllMovies: show => dispatch(actions.show_all_movies(show)),
        onUpdateScrollP: position => dispatch(actions.update_scroll_position(position))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MoviesList);