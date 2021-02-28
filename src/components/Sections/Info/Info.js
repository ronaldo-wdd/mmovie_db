import React, { Component } from 'react';
import classes from './Info.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { scrollX, touchStart, maxDeltaX } from '../../../shared/utility';

import starIcon from '../../../assents/images/icons/star.png';
import Button from '../../UI/Buttons/Buttons';
import MovieDetails from './MovieDetails/MovieDetails';


class Info extends Component {
    constructor(props) { 
        super(props);
        this.mainRef = React.createRef();
        this.titleRef = React.createRef();
        this.onScroll = this.handleScroll.bind(this);
    }

    state = { 
        mainOffsetTop: 0,
        genreDeltaX: 0,
        castDeltaX: 0,
        maxGenreDeltaX: 0,
        maxCastDeltaX: 0,
        touchStart: 0
    }

    componentDidMount () {
        const pathname = this.props.history.location.pathname.split('/')[1];
        this.setMaxDeltaX();
        pathname === 'movie' && this.setMaxDeltaX(true);
        
        this.props.id_param 
            && this.toggleMoreDetails(true, this.props.id_param);
    }

    componentWillUnmount () {
        this.props.onShowModal(false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)) 
            ? true : false;
    }
    
    componentDidUpdate () {
        if (!this.props.scrollTrigger) return;
        this.props.scrollTrigger.opacity.refresh();
        this.props.scrollTrigger.y.refresh();
        this.props.scrollTrigger.opacity.disable();
        this.props.scrollTrigger.y.disable();
        
        this.props.showAll
            ? this.props.scrollTrigger.opacity.enable()
            : this.props.scrollTrigger.opacity.disable();
        
        this.props.showAll || !this.props.isMobile
            ? this.props.scrollTrigger.y.enable()
            : this.props.scrollTrigger.y.disable();
           
        this.props.showMoreDetails || this.props.showAll
            ? this.props.scrollTrigger.pin.disable()
            : this.props.scrollTrigger.pin.enable();
    }

    toggleMoreDetails (show, id) {
        this.props.onShowMoreDetails(show);
        
        if (show) {
            this.props.onGetMovieCast(id);
            this.setOffsetTop();
            setTimeout(() => { this.setMaxDeltaX(true); }, 300); 
        } else this.props.id_param && this.props.history.goBack();
    }

    setOffsetTop () {
        const mainOffsetTop = this.titleRef.current
            ? this.titleRef.current.offsetTop : 70;
        this.setState({mainOffsetTop: mainOffsetTop});
    }

    setMaxDeltaX (cast=false) {
        if(!this.mainRef.current) return;
        
        let el = this.mainRef.current,
            target = cast 
                ? el.querySelector('#castList')
                : el.querySelector('#genres'),
            deltaX = cast ? maxDeltaX(target) : maxDeltaX(target, el);

        cast 
            ? this.setState({maxCastDeltaX: deltaX})
            : this.setState({maxGenreDeltaX: deltaX});
    }

    handleScroll (e, cast = false) {
        if(cast) {
            const deltaX = scrollX(e, this.state.castDeltaX, this.state.maxCastDeltaX, this.state.touchStart);
            this.setState({castDeltaX: deltaX});
        } else {
            const deltaX = scrollX(e, this.state.genreDeltaX, this.state.maxGenreDeltaX, this.state.touchStart);
            this.setState({genreDeltaX: deltaX});
        } 
    }
    
    render () {
        if (!this.props.loaded) return <Container className={classes.Info} />
        
        const movie = this.props.movies[this.props.activeMovie],
            vote = movie.vote_average,
            stars = [2,4,6,8,10].map((value, index) => {
                return <img key={index} src={starIcon} alt="" 
                    style={{opacity: vote - value >= -1 ? 1 : '.3'}} />;
            }),
            movieGenres = movie.genre_ids.map((id, index) => {
                return <li key={index}>{this.props.genresList[id]}</li>
            }),
            mainStyle = (this.props.showMoreDetails && !this.props.isMobile)
                && {display: "block", marginTop: this.state.mainOffsetTop};

            let infoClasses = [classes.Info];
            this.props.isMobile && infoClasses.push(classes.Mobile);
            this.props.showMoreDetails && infoClasses.push(classes.MoreDetails);

        return (
            <Container id="info"
                className={infoClasses.join(' ')} 
                fluid="xxl" >

                <Col sm="12" md="6" lg="5" 
                    ref={this.mainRef}
                    className={classes.Main} style={{...mainStyle}}>
                    <div className={classes.Title} >
                        <h1 ref={this.titleRef} title={movie.title}>{movie.title}</h1>
                    </div>
                    <ul id='genres'
                        onWheel = { event => this.handleScroll(event) }
                        onTouchStart = { event => this.setState({touchStart: touchStart(event)}) }
                        onTouchMove = { event => this.handleScroll(event) }
                        style={{transform: `translateX(-${this.state.genreDeltaX}px)`}} >
                        {movieGenres}</ul>
                    <div className={classes.Stars}>
                        {stars}
                        <p>{vote*10}%</p>
                    </div>
                    {this.props.showMoreDetails && 
                        <MovieDetails movie={movie}
                            onTouchStart = { start => this.setState({touchStart: start}) }
                            handleScroll = {this.onScroll}
                            deltaX = {this.state.castDeltaX}
                            maxDeltaX = {this.state.maxCastDeltaX} />}
                    <Button className={classes.SeeMoreBtn}
                        click={() => this.toggleMoreDetails(!this.props.showMoreDetails, movie.id)}
                        >{!this.props.showMoreDetails ? 'See more' : 'Go Back'}
                    </Button>
                </Col>

                <div className={classes.NextBtn}>
                    {!this.props.showMoreDetails &&
                        <Button type="next"
                        click={ ()=> this.props.onSetActiveMovie(this.props.activeMovie + 1)}/>}
                </div>
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        genresList: state.movies.genresList,
        activeMovie: state.movies.activeMovie,
        loaded: state.navigation.loaded,
        castLoaded: state.movies.castLoaded,
        showMoreDetails: state.navigation.showMovieDetails,
        isMobile: state.navigation.mobile,
        showAll: state.navigation.showAllMovies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveMovie: index => dispatch(actions.active_movie(index)),
        onGetMovieCast: id => dispatch(actions.fetch_movies_cast(id)),
        onShowMoreDetails: show => dispatch(actions.show_movie_details(show)),
        onShowModal: show => dispatch(actions.show_modal(show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);