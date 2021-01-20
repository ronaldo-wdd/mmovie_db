import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import './Backdrop.css';
import classes from './Backdrop.module.css';
import * as actions from '../../../../../store/actions';


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
            const mainMovies = [...this.props.movies.results].slice(
                this.props.activeMovie,
                this.props.activeMovie + 3);

            mainMovies.unshift([...this.props.movies.results].slice(
                this.props.activeMovie - 1
            )[0]);
                
            this.setState({mainMovies: mainMovies, loading: false});
            console.log(this.state.mainMovies);
        }
    }
    
    render () {
        const displayedMovies = [];
        const backdropsConfig = [
            {md: '10', class: classes.PrevBackdrop},
            {md: '10', class: classes.Backdrop},
            {md: '5', class: classes.NextBackdrop},
            {md: '4', class: classes.FakeBackdrop},
        ];

        this.state.mainMovies.forEach((el, key) => {
            displayedMovies.push(
                <CSSTransition
                    key={el.id}
                    timeout={700}
                    classNames="slide" >
                    <Col md={backdropsConfig[key].md}
                        className={backdropsConfig[key].class} >
                        <img src={`https://image.tmdb.org/t/p/original${el.backdrop_path}`} />
                    </Col>
                </CSSTransition>
            )
        });
        
        return (

            !this.state.loading &&

            <div className={classes.Carousel} onClick={()=>this.props.onSetActiveMovie(this.props.activeMovie + 1)} >
                <TransitionGroup component={null}>
                    {displayedMovies}
                </TransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeMovie: state.activeMovie,
        movies: state.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveMovie: index => dispatch(actions.activeMovie(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);