import React, {Component} from 'react';
import classes from './Main.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { inspect } from 'util';

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

    componentDidMount(){
        setTimeout(()=> window.scroll(0, 0), 100);
        this.props.onLoad(true)
    }
    
    shouldComponentUpdate(nextProps, nextState) {     
        return (this.props !== nextProps || inspect(this.state) !== inspect(nextState))
            ? true : false;
    }
    
    componentDidUpdate() {
        this.state.movies.length === 0
            ? this.setState({movies: this.props.movies.slice(0, 10)})
            : this.props.onLoad(false);
        
        setTimeout(() => {
            !this.props.loading && !this.state.gsapAnim
                && this.setState({gsapAnim: gsapAnim(this.mainRef.current)})
        }, 300);
    }

    render() {
        if (this.props.loading) return <div />
        
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
        loading: state.navigation.loading,
        showAll: state.navigation.showAllMovies,
        movies: state.movies.movies,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowAllMovies: show => dispatch(actions.show_all_movies(show)),
        onLoad: ld => dispatch(actions.loading(ld))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);