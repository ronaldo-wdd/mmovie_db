import React, { Component } from 'react';
import classes from './Info.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import starIcon from '../../../assents/images/icons/star.png';
import Button from '../../UI/Buttons/Buttons';
import playBtn from '../../../assents/svg/play.svg';
import MovieDetails from './MovieDetails/MovieDetails';


class Info extends Component {
    constructor(props) {
        super(props);
        this.mainRef = React.createRef();
    }

    state = { mainOffsetTop: 0 }

    componentDidMount () {
        this.props.id_param 
            && this.toggleMoreDetails(true, this.props.id_param);
    }

    componentDidUpdate () {
        if (this.props.scrollTrigger == null) return;
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
        } else this.props.id_param && this.props.history.goBack();
    }

    setOffsetTop () {
        const mainOffsetTop = this.mainRef.current
            ? this.mainRef.current.offsetTop : 70;
        this.setState({mainOffsetTop: mainOffsetTop});
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

                <Col sm="12" md="6" lg="5" className={classes.Main} style={{...mainStyle}}>
                    <div className={classes.Title} >
                        <h1 ref={this.mainRef} title={movie.title}>{movie.title}</h1>
                    </div>
                    <ul>{movieGenres}</ul>
                    <div className={classes.Stars}>
                        {stars}
                        <p>{vote*10}%</p>
                    </div>
                    {this.props.showMoreDetails && <MovieDetails movie={movie} />}
                    <Button className={classes.SeeMoreBtn}
                        click={() => this.toggleMoreDetails(!this.props.showMoreDetails, movie.id)}
                        >{!this.props.showMoreDetails ? 'See more' : 'Go Back'}
                    </Button>
                </Col>

                <Col md="6" className={classes.PlayTrailer}>
                    <img src={playBtn} alt="" />
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
        showMoreDetails: state.navigation.showMovieDetails,
        isMobile: state.navigation.mobile,
        showAll: state.navigation.showAllMovies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveMovie: index => dispatch(actions.active_movie(index)),
        onGetMovieCast: id => dispatch(actions.fetch_movies_cast(id)),
        onShowMoreDetails: show => dispatch(actions.show_movie_details(show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);