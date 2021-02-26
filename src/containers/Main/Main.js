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

    componentDidMount() {
        setTimeout(() => {
            this.setState({movies: this.props.movies.slice(0, 10)});

            let gsap = gsapAnim(this.mainRef.current);
            this.setState({gsapAnim: gsap});
        }, 300);
    }
    

    render() {
        return (
            <div className={classes.Main} ref={this.mainRef}>
                <Info
                    history={this.props.history}
                    scrollTrigger={this.state.gsapAnim 
                        && this.state.gsapAnim.infoST} />
                <MoviesList
                    limit={true}
                    movies={this.state.movies}
                    history={this.props.history}
                    scrollTrigger={this.state.gsapAnim 
                        && this.state.gsapAnim.moviesListST} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isMobile: state.navigation.mobile,
        loaded: state.navigation.loaded,
        showAll: state.navigation.showAllMovies,
        movies: state.movies.movies,
        activeMovie: state.movies.activeMovie
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowAllMovies: show => dispatch(actions.show_all_movies(show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);