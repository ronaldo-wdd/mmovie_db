import classes from './Search.module.css';
import React, { Component } from 'react';

import MoviesList from '../../Sections/MoviesList/MoviesList';
import TopNav from '../../Navigation/TopNav/TopNav';

class Search extends Component {
    render () {
        return (
            <div className={classes.Search}>
                <TopNav search={true} history={this.props.history} />
                {/* <MoviesList history={props.history} /> */}
            </div>
        );
    }
}

export default Search;