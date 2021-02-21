import React, { Component } from 'react';
import classes from './Header.module.css';
import Container from 'react-bootstrap/Container';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';

import Logo from './Logo/Logo';
import Nav from './Nav/Nav';

class Header extends Component {
    state = {
        showMobileNav: false,
    }
    
    handleNavLinksClick = (filter) => {
        animateScroll.scrollToTop({ smooth: true });
        
        if ( filter === this.props.activeFilter ) return;
        (!this.props.isMobile || this.state.showMobileNav)
            && this.props.onSetFilter(filter);
    }

    render () {
        return (
            <header className={classes.Header}>
                <Container fluid='xxl' className={classes.Container}>
                    <Logo />
                    <Nav activeFilter={this.props.activeFilter}
                        pathname = {this.props.history.location.pathname}
                        showMobileNav={this.state.showMobileNav}
                        handleNavLinksClick = {filter => this.handleNavLinksClick(filter)}
                        clicked = {() => this.setState({showMobileNav: !this.state.showMobileNav})} />
                </Container>
            </header>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeFilter: state.movies.activeFilter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetFilter: filter => dispatch(actions.set_active_filter(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);