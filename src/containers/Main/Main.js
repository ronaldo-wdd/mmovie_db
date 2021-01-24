import React, {Component} from 'react';
import classes from './Main.module.css';

import { connect } from 'react-redux';

import MainMovie from '../../components/Sections/MainMovie/MainMovie';
import MoviesList from '../../components/Sections/MoviesList/MoviesList';
import Info from '../../components/Sections/MainMovie/Info/Info';


class Main extends Component {
    render() {
        return (
            <div className={classes.Main}>
                <MainMovie />
                { (this.props.isMobile && !this.props.loading) 
                    && (<Info mobile={true} />) }
                {!this.props.showMoreDetails && <MoviesList />}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isMobile: state.navigation.mobile,
        loading: state.navigation.loading,
        showMoreDetails: state.navigation.showMovieDetails
    }
}

export default connect(mapStateToProps)(Main);