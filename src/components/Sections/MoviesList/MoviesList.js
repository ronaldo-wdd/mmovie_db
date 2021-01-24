import React, { Component } from 'react';
import classes from './MoviesList.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux";

import * as actions from '../../../store/actions';
import Movie from './Movie/Movie';
import Buttons from '../../UI/Buttons/Buttons';
import { scrollX } from '../../../shared/utility';


class MoviesList extends Component {
    constructor (props) {
        super(props);
        this.rowRef = React.createRef();
        // this.colRef = React.createRef();
    }
    
    state = {
        deltaX: 0,
        maxDeltaX: 0
    }

    componentDidMount () {
        window.addEventListener('resize', this.getRowDetaX());
        setTimeout(() => {
            this.getRowDetaX();
        }, 700);
    }

    getRowDetaX () {
        const maxDeltaX = this.rowRef.current.scrollWidth - this.rowRef.current.clientWidth;
        this.setState({maxDeltaX: maxDeltaX});
    }

    handleScrollX (e) {
        const deltaX = scrollX(e, this.state.deltaX, this.state.maxDeltaX);
        this.setState({deltaX: deltaX});
    }
    
    render () {
        const movies = this.props.movies.map((movie, key) => {
            return <Movie key={key} movie={movie}
                    active={this.props.activeMovie === key ? true : false}
                    click={ () => this.props.onSetActiveMovie(key)} />
        }),
            rowStyle = this.props.showAll 
                ? {}
                : {flexWrap: 'nowrap', width: '95%'}
        
        return (
            <Container fluid="xxl" className={classes.MoviesList} >
                <Row ref={this.rowRef}
                    onWheel={e => this.props.showAll && this.handleScrollX(e)}
                    style={{
                        ...rowStyle,
                        transform: `translateX(-${this.state.deltaX}px)`
                        }} >
                    {movies}
                </Row>
                <Buttons type="showAll" click={() => this.props.onShowAllMovies(true)} />
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        activeMovie: state.movies.activeMovie,
        showAll: state.navigation.showAllMovies,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowAllMovies: show => dispatch(actions.show_all_movies(show)),
        onSetActiveMovie: id => dispatch(actions.set_active_movie(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MoviesList);