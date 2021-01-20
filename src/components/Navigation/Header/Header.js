import React, { Component } from 'react';
import classes from './Header.module.css';
import Container from 'react-bootstrap/Container';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

import Logo from './Logo/Logo';
import Nav from './Nav/Nav';

class Header extends Component {
    state = {
        showMobileNav: false,
    }

    handleNavLinksClick = (filter) => {
        (!this.props.isMobile || this.state.showMobileNav)
            && this.props.onSetFilter(filter);
    }

    handleNavClick = () => { 
        this.props.isMobile
            && this.setState({showMobileNav: !this.state.showMobileNav});
    }
    
    render () {
        return (
            <header className={classes.Header}>
                <Container fluid='xxl' className={classes.Container}>
                    <Logo />
                    <Nav 
                        activeFilter={this.props.activeFilter}
                        showMobileNav={this.state.showMobileNav}
                        handleNavLinksClick = {filter => this.handleNavLinksClick(filter)}
                        clicked = {() => this.handleNavClick()} />
                </Container>
            </header>
        );
    }
}


const mapStateToProps = state => {
    return {
        activeFilter: state.activeFilter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetFilter: filter => dispatch(actions.set_active_filter(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);