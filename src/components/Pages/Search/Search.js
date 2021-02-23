import classes from './Search.module.css';
import React, { Component } from 'react';

import MoviesList from '../../Sections/MoviesList/MoviesList';
import TopNav from '../../Navigation/TopNav/TopNav';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';


class Search extends Component {
    state = { movies: [] }

    componentDidMount() {        
        this.props.onSetParams({
            genre: undefined, 
            year: undefined, 
            query: this.props.query || ''
        });
    }

    componentWillUnmount() {
        const pathname = this.props.history.location.pathname.split('/')[1];
        if (pathname !== 'movie') {
            this.props.onSetParams({query: undefined});
            this.props.onFetchMovies();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)) 
            ? true : false;
    }
    
    componentDidUpdate() {
        (this.props.loaded && (this.props.query || this.props.query !== ''))
                && this.setState({movies: this.props.movies, searching: false});
    }
    
    handleInputChange(event) {
        this.props.onLoading();
        this.props.onSetParams({query: event.target.value});
    }

    handleFormSubmit(event) {
        this.setState({searching: true});
        event.preventDefault();
        this.props.onFetchMovies();
    }

    render () {
        return (
            <div className={classes.Search}>
                <TopNav search={true} 
                    history={this.props.history}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handleFormSubmit = {this.handleFormSubmit.bind(this)} />
                <MoviesList movies={this.state.movies}
                    history={this.props.history} />
            </div>
        );
    }
}


const mapStateToProps = state => ({ 
    movies: state.movies.movies,
    query: state.movies.params.query,
    loaded: state.navigation.loaded
}),
    mapDispatchToProps = dispatch => ({ 
        onSetParams: params => dispatch(actions.set_params(params)),
        onFetchMovies: ()=> dispatch(actions.fetch_movies()),
        onLoading: ()=> dispatch(actions.loaded(false))
    });

export default connect(mapStateToProps, mapDispatchToProps)(Search);