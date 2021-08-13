import classes from './Auth.module.css';
import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import axios from '../../../axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';


const Auth = props => {
    const { onSetToken, request_token, onAuth } = props,
        // [isLoading, setLoading] = useState(false),
        [username, setUsername] = useState(''),
        [password, setPassword] = useState('');
    
    useEffect(()=> {
        if (request_token) return;
        
        axios.get('/authentication/token/new')
            .then(response => onSetToken(response.data.request_token));
    }, [onSetToken, request_token]);
    
    const handleSubmite = event => {
        event.preventDefault();
        onAuth(username, password);
    }
    
    return (
        <div className={classes.Auth}>
            <Col md='5' className={classes.Card}>
                <form onSubmit={handleSubmite}>
                    <div className = {classes.Title}>
                        <p>Login</p>
                        <a href="https://www.themoviedb.org/signup" target="blank">
                            Sign up
                        </a>
                    </div>
                    <input type="text"
                        placeholder="username*"
                        onChange={event => setUsername(event.target.value)} />
                    <input type="password"
                        placeholder="password*"
                        onChange={event => setPassword(event.target.value)} />
                    <input type="submit" value="LOGIN" />
                </form>
            </Col>
        </div>
    );
}


const mapStateToProps = state => ({
    request_token: state.auth.request_token,
    loading: state.navigation.loading
});

const mapDispatchToProps = dispatch => {
    return {
        onSetToken: token => dispatch(actions.request_token(token)),
        onAuth: (user, password) => dispatch(actions.auth(user, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);