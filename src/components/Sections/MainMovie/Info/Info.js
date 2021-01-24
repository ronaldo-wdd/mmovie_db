import React, { Component } from 'react';
import classes from './Info.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';

import starIcon from '../../../../assents/images/icons/star.png';
import Button from '../../../UI/Buttons/Buttons';
import playBtn from '../../../../assents/svg/play.svg';
import MovieDetails from './MovieDetails/MovieDetails';


class Info extends Component {
    constructor(props) {
        super(props);
        this.mainRef = React.createRef();
    }

    state = { mainOffsetTop: 0 }

    componentDidMount () {
        this.props.onShowMoreDetails(false);
    }

    toggleMoreDetails (show, id) {
        const mainOffsetTop = this.mainRef.current.offsetTop;

        show && this.props.onGetMovieCast(id);
        this.props.onShowMoreDetails(show);
        this.setState({mainOffsetTop: mainOffsetTop});
    }
    
    render () {
        const movie = this.props.movies[this.props.activeMovie],
            vote = movie.vote_average,
            stars = [2,4,6,8,10].map((value, index) => {
                return <img key={index}
                    src={starIcon} 
                    alt="" 
                    style={{opacity: vote - value >= -1 ? 1 : '.3'}} />;
            }),
            movieGenres = movie.genre_ids.map((id, index) => {
                return <li key={index}>{this.props.genresList[id]}</li>
            }),
            mainStyle = this.props.showMoreDetails 
                ? {display: "block", marginTop: this.state.mainOffsetTop}
                : {};
        
        return (
            <Container className={classes.Info} fluid="xxl" 
                style={this.props.mobile ? {height: 'auto'} : {height: '70vh'}} >

                <Col sm="12" md="5" className={classes.Main} style={mainStyle}>
                    <h1 ref={this.mainRef}>{movie.title}</h1>
                    <ul>{movieGenres}</ul>
                    <div className={classes.Stars}>
                        {stars}
                        <p>{vote*10}%</p>
                    </div>
                    {this.props.showMoreDetails && <MovieDetails movie={movie} />}
                    <Button
                        click={() => this.toggleMoreDetails(!this.props.showMoreDetails, movie.id)}
                        >{!this.props.showMoreDetails ? 'See more' : 'Close'}
                    </Button>
                </Col>

                <Col md="6" className={classes.PlayTrailer}>
                    <img src={playBtn} alt="" />
                </Col>

                <Container fluid="xxl" className={classes.NextBtn}>
                    {!this.props.showMoreDetails &&
                        <Button type="next"
                        click={ ()=> this.props.onSetActiveMovie(this.props.activeMovie + 1)}/>}
                </Container>
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        genresList: state.movies.genresList,
        activeMovie: state.movies.activeMovie,
        loading: state.navigation.loading,
        showMoreDetails: state.navigation.showMovieDetails
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