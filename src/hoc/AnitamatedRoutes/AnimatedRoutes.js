import React from 'react';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from '../../containers/Main/Main';
import Search from '../../components/Pages/Search/Search';
import Movies from '../../components/Pages/Movies/Movies';
import Movie from '../../components/Pages/Movie/Movie';

import { fadeOut, play } from '../../shared/Timelines/pageTransition';


const AnimatedRoutes = props => {
    const pathname = props.location.pathname.split('/')[1] || 'home', 
        key = props.location.pathname.split('/')[1] || 'home';
    
    return ( 
        <TransitionGroup component={null} className="all">
            <Transition
                key = {key}
                appear = {true}
                onEnter = { node => play(node, pathname) }
                onExit = { node => fadeOut(node) }
                timeout = { {enter: 350, exit: 350} } >
                <Switch location={props.location}>
                    <Route path="/search" component={Search} />
                    <Route path="/movie/:id" component={Movie} />
                    <Route path="/movies/:id" component={Movies} />
                    <Route path="/" component={Main} />
                    <Redirect to="/" />
                </Switch>
            </Transition>
        </TransitionGroup>
    );
}


export default AnimatedRoutes;