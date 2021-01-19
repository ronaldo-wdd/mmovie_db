import React, {Component} from 'react';
import classes from './Main.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import MainMovie from '../../components/Sections/MainMovie/MainMovie';
import MoviesList from '../../components/Sections/MoviesList/MoviesList';


class Main extends Component {
    componentDidMount () {
        console.log("componentDidMount");
        this.props.onFetchMovies();
    }

    render() {
        return (
            <div className={classes.Main}>
                <MainMovie />
                <Container fluid="xxl" className={classes.MoviesList}>
                    <MoviesList />
                </Container>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchMovies: () => dispatch(actions.fetch_movies())
    }
}

export default connect(null, mapDispatchToProps)(Main);