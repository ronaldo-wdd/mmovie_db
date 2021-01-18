import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';


class AllMovies extends Component {
    componentDidMount () {
        console.log("componentDidMount");
        this.props.onFetchMovies();
    }
    
    render() {
        return (
            <div></div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchMovies: () => dispatch(actions.fetch_movies())
    }
}

export default connect(null, mapDispatchToProps)(AllMovies);