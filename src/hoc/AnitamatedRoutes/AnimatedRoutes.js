import React from 'react';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Route, Switch } from 'react-router-dom';

import Main from '../../containers/Main/Main';
import Search from '../../containers/Search/Search';


const AnimatedRoutes = props => {
    return ( 
        <TransitionGroup component={null} className="all">
            <Transition
                key = {props.key}
                appear = {true}
                onEnter = { ()=> console.log(props.location.pathname + ' has entered!!!')}
                onExit = { ()=> console.log(props.location.pathname + ' has leaved!!!')}
                timeout = {{enter: 350, exit: 350}} >
                <Switch>
                    <Route path="/search" component={Search} />
                    <Route path="/" component={Main} />
                </Switch>
            </Transition>
        </TransitionGroup>
    );
}


export default AnimatedRoutes;