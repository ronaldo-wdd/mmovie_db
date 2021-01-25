import React, {Component} from 'react';
import classes from './Main.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import MainMovie from '../../components/Sections/MainMovie/MainMovie';
import MoviesList from '../../components/Sections/MoviesList/MoviesList';


class Main extends Component {
    state = {
        movies: []
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)) 
            ? true : false;
    }
    
    componentDidUpdate () {
        let movies = [];
        if (this.props.history.location.pathname === '/movies') {
            this.props.onShowAllMovies(true);
            movies = this.props.movies;
        }

        else {
            this.props.onShowAllMovies(false);
            movies = this.props.movies.slice(0, 10);
        }

        this.setState({movies: movies});
    }
    
    render() {
        return (
            <div className={classes.Main}>
                <MainMovie movies={this.state.movies} />
                {!this.props.showMoreDetails 
                    && <MoviesList 
                        history={this.props.history} 
                        movies={this.state.movies} />}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isMobile: state.navigation.mobile,
        loading: state.navigation.loading,
        showMoreDetails: state.navigation.showMovieDetails,
        movies: state.movies.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowAllMovies: show => dispatch(actions.show_all_movies(show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);