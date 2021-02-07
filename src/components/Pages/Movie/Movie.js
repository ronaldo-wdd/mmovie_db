import * as classes from './Movie.module.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Info from '../../Sections/Info/Info';


class Movie extends Component {
    componentWillUnmount () {
        this.props.onShowMoreDetails(false);
    }
    
    render () {
        return (
            <div className={classes.Info}>
                <Info all = {true} 
                    id_param = {this.props.match.params.id}
                    history = {this.props.history} />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return { onShowMoreDetails: show => dispatch(actions.show_movie_details(show)) }
}

export default connect(null, mapDispatchToProps)(Movie);
