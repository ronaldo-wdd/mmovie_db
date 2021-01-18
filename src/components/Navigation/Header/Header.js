import React, { Component } from 'react';
import classes from './Header.module.css';
import Container from 'react-bootstrap/Container';

import Logo from './Logo/Logo';
import Nav from './Nav/Nav';

class Header extends Component {
    state = {
        showMobileNav: false,
        activeFilter: 1
    }

    handleNavLinksClick = (filter) => {
        (!this.props.isMobile || this.state.showMobileNav)
            && this.setState({activeFilter: filter});
        console.log(filter);
    }

    handleNavClick = () => { 
        this.props.isMobile
            && this.setState({showMobileNav: !this.state.showMobileNav});
    }
    
    render () {
        return (
            <header className={classes.Header}>
                <Container className={classes.Container}>
                    <Logo />
                    <Nav 
                        activeFilter={this.state.activeFilter}
                        showMobileNav={this.state.showMobileNav}
                        handleNavLinksClick = {filter => this.handleNavLinksClick(filter)}
                        clicked = {() => this.handleNavClick()} />
                </Container>
            </header>
        );
    }
}

export default Header;