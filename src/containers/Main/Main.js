import React, {Component} from 'react';
import classes from './Main.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import MoviesList from '../../components/Sections/MoviesList/MoviesList';
import Info from '../../components/Sections/Info/Info';
import { gsapAnim } from '../../shared/Timelines/gsapAnimations';


class Main extends Component {  
    constructor (props) {
        super(props);
        this.mainRef = React.createRef();
    }
      
    state = {
        movies: [],
        gsapAnim: null
    }

    componentDidMount () {
        setTimeout(() => {
            console.log(this.mainRef.current);
            let gsap = gsapAnim(this.mainRef.current);
            this.setState({gsapAnim: gsap});
        }, 500);
    }
    
    componentDidUpdate () {
        if (this.props.history.location.pathname === '/movies') {
            this.props.onShowAllMovies(true);
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }

        else {
            this.props.onShowAllMovies(false);
            window.removeEventListener('scroll', this.handleScroll.bind(this));
        }
    }

    handleScroll () {
        const limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight;

        (this.props.showAll && limit - window.scrollY < 100) &&
            this.props.onShowMoreMovies();
    }
    
    
    render() {
        return (
            <div className={classes.Main} ref={this.mainRef}>
                <Info scrollTrigger={this.state.gsapAnim 
                    && this.state.gsapAnim.infoST} />
                <MoviesList 
                    history={this.props.history} 
                    // movies={this.state.movies}
                    scrollTrigger={this.state.gsapAnim 
                        && this.state.gsapAnim.moviesListST} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isMobile: state.navigation.mobile,
        loading: state.navigation.loading,
        // showMoreDetails: state.navigation.showMovieDetails,
        showAll: state.navigation.showAllMovies,
        // movies: state.movies.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowAllMovies: show => dispatch(actions.show_all_movies(show)),
        onShowMoreMovies: () => dispatch(actions.fetch_more_movies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);