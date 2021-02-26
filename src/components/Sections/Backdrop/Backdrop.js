import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import classes from './Backdrop.module.css';
import { inspect } from 'util';

import defaultBackdropPath from '../../../assents/images/defaultBackdrop.jpg';
import { backdropGsap } from '../../../shared/Timelines/gsapAnimations';
import PlayBtn from "../../UI/svg/PlayBtn";
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../../store/actions';


class Backdrop extends Component {
    constructor (props) {
        super(props);
        this.bdRef = React.createRef();
    }
    
    state = {
        mainMovies: [],
        loading: true,
        openModal: false,
        loadingTrailer: false,
        gsapAnim: null,
        visible: true
    }

    componentDidMount() {
        setTimeout(() => {
            const gsapAnim = backdropGsap(this.bdRef.current);
            this.setState ({gsapAnim: gsapAnim});
        }, 300);
    }
    
    shouldComponentUpdate(nextProps, nextState) {     
        return (this.props !== nextProps || inspect(this.state) !== inspect(nextState)) 
            ? true : false;
    }

    componentDidUpdate () {
        let visible = this.props.page === '' || this.props.page === 'movie';
        this.setState({visible: visible});

        if (this.props.movies != null) {
            let mainMovies = [...this.props.movies].slice(
                this.props.activeMovie,
                this.props.activeMovie + 3);

            mainMovies.unshift([...this.props.movies].slice(
                this.props.activeMovie - 1
            )[0]);

            this.setState({mainMovies: mainMovies, loading: false});
        }
        
        if (this.state.gsapAnim) {
            !this.state.visible
                ? this.state.gsapAnim.disable()
                : this.state.gsapAnim.enable()
        }
    }

    onPlayTrailer () {
        this.setState({loadingTrailer: true});
        const id = this.props.movies[this.props.activeMovie].id;

        !this.props.video || this.props.video.id !== id
            ? this.props.onFetchMovieTrailer(id)
            : this.toggleModal(true); 
    }

    toggleModal (show) {
        this.props.onShowModal(show);
        this.setState({loadingTrailer: false});
    }
    
    render () {
        let displayedMovies = [],
            backdropsConfig = [
                {md: '10', class: classes.PrevBackdrop},
                {md: '10', class: classes.Backdrop},
                {md: '5', class: classes.NextBackdrop},
                {md: '4', class: classes.FakeBackdrop},
            ],
            movies = this.state.mainMovies,
            carouselClasses = [classes.Carousel],
            afterClasses = [classes.After];

        this.state.loading && carouselClasses.push(classes.Loading);
        this.props.showModal && carouselClasses.push(classes.Blur);
        !this.state.visible && afterClasses.push(classes.Hidden);

        if (!this.state.loading) { 
            for (let i=0; i<4; i++) {
                displayedMovies.push(
                    <CSSTransition
                        key={movies[i] ? movies[i].id : i}
                        timeout={700}
                        classNames="slide" >
                        <Col md={backdropsConfig[i].md}
                            className={backdropsConfig[i].class} >
                            {movies[i] && (
                                <img alt={movies[i].title}
                                src={`https://image.tmdb.org/t/p/w1280${movies[i].backdrop_path}`}
                                onError={ e => e.target.src=defaultBackdropPath } />
                            )}
                        </Col>
                    </CSSTransition>
                );
            }
        }

        return (
            <div ref={this.bdRef}>
                <div id='Carousel' className={carouselClasses.join(' ')} >
                    <TransitionGroup component={null}>
                        {displayedMovies}
                    </TransitionGroup>
                    <div id='after' className={afterClasses.join(' ')} />
                </div>

                <Col md="8" className={classes.PlayTrailer}>
                    {this.state.visible &&
                    <PlayBtn className={classes.Svg}
                        error={this.props.videoError}
                        loading={this.state.loadingTrailer}
                        click = { () => this.onPlayTrailer() } />}
                </Col>

                {this.props.showModal && 
                    <Modal id={this.props.video.results[0].key}
                        click={ ()=> this.toggleModal(false)} />}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeMovie: state.movies.activeMovie,
        movies: state.movies.movies,
        video: state.movies.video,
        videoError: state.movies.videoError,
        showModal: state.navigation.showModal,
        page: state.navigation.currPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMovieTrailer: id => dispatch(actions.fetch_movie_trailer(id)),
        onShowModal: show => dispatch(actions.show_modal(show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);