import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import './Backdrop.css';
import classes from './Backdrop.module.css';
import defaultBackdropPath from '../../../../../assents/images/defaultBackdrop.jpg';


class Backdrop extends Component {
    state = {
        mainMovies: [],
        loading: true
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || JSON.stringify(this.state) !== JSON.stringify(nextState)) 
            ? true : false;
    }

    componentDidUpdate () {
        if (this.props.movies != null) {
            const mainMovies = [...this.props.movies].slice(
                this.props.activeMovie,
                this.props.activeMovie + 3);

            mainMovies.unshift([...this.props.movies].slice(
                this.props.activeMovie - 1
            )[0]);
                
            this.setState({mainMovies: mainMovies, loading: false});
        }
    }
    
    render () {
        const displayedMovies = [],
            backdropsConfig = [
                {md: '10', class: classes.PrevBackdrop},
                {md: '10', class: classes.Backdrop},
                {md: '5', class: classes.NextBackdrop},
                {md: '4', class: classes.FakeBackdrop},
            ],
            movies = this.state.mainMovies;

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
                                <img 
                                src={`https://image.tmdb.org/t/p/original${movies[i].backdrop_path}`}
                                onError={ e => e.target.src=defaultBackdropPath } />
                            )}
                        </Col>
                    </CSSTransition>
                );
            }
        }
        
        return (
            !this.state.loading &&

            <div className={classes.Carousel} >
                <TransitionGroup component={null}>
                    {displayedMovies}
                </TransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeMovie: state.movies.activeMovie,
        movies: state.movies.movies
    }
}

export default connect(mapStateToProps)(Backdrop);