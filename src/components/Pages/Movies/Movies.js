import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesList from '../../Sections/MoviesList/MoviesList';
import classes from './Movies.module.css';

import * as actions from '../../../store/actions';
import TopNav from '../../Navigation/TopNav/TopNav';

class Movies extends Component {
    componentDidUpdate () {
        const filters = {
            popular: 'popular',
            'in-theatres': 'now_playing',
            upcoming: 'upcoming'
        },
            filter = this.props.match.params.id,
            activeFilter = filters[filter];

        activeFilter !== this.props.activeFilter
            && this.props.onSetActiveFilter(activeFilter);
    }
    
    render () {
        return (
            <div className={classes.Movies}>
                <TopNav 
                    filter={true}
                    history={this.props.history} />
                <MoviesList 
                    movies={this.props.movies}
                    history={this.props.history} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        activeFilter: state.movies.activeFilter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveFilter: filter => dispatch(actions.set_active_filter(filter))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);