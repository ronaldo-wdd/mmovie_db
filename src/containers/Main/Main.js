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
        this.onScroll = this.fetchMoreMovies.bind(this)
    }
      
    state = {
        movies: [],
        gsapAnim: null
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);

        setTimeout(() => {
            let gsap = gsapAnim(this.mainRef.current),
                position = Math.max(
                    this.mainRef.current.querySelector('#moviesList').getBoundingClientRect().top - 125,
                    this.props.scrollPosition);
            this.setState({gsapAnim: gsap});
            this.props.onUpdateScrollP(position);
        }, 500);
    }
    
    componentDidUpdate() {
        if (this.props.history.location.pathname === '/movies') {
            this.props.onShowAllMovies(true);
            this.handleScroll(true);
        } else {
            this.handleScroll(false);
            this.props.onShowAllMovies(false);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    handleScroll(showAll) {
        showAll
            ? window.scrollTo(0, this.props.scrollPosition)
            : window.scrollTo(0, 0);
        
        this.state.gsapAnim && 
        Object.values(this.state.gsapAnim.infoST).forEach(scrollTrigger => {
            scrollTrigger.refresh();
        });
    }
    
    fetchMoreMovies() {
        const limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight;

        (this.props.showAll && limit - window.scrollY < 100) &&
            this.props.onShowMoreMovies();
    }
    
    render() {
        return (
            <div className={classes.Main} ref={this.mainRef}>
                <Info
                    history={this.props.history}
                    scrollTrigger={this.state.gsapAnim 
                        && this.state.gsapAnim.infoST} />
                <MoviesList
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
        loading: state.navigation.loading,
        showAll: state.navigation.showAllMovies,
        scrollPosition: state.navigation.moviesListScrollPosition
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowAllMovies: show => dispatch(actions.show_all_movies(show)),
        onShowMoreMovies: () => dispatch(actions.fetch_more_movies()),
        onUpdateScrollP: position => dispatch(actions.update_scroll_position(position))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);