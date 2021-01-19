import React, { Component } from 'react'; 
import classes from './Layout.module.css';
import './Layout.css';

class Layout extends Component {
    render() {
        return (
            <main className={classes.Container}>
                {this.props.children}
            </main>
        )
    }
}

export default Layout;