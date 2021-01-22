import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";

import Layout from './hoc/Layout/Layout';
import Header from './components/Navigation/Header/Header';
import Main from './containers/Main/Main';
import * as actions from './store/actions';
// import AllMovies from './containers/AllMovies/AllMovies';


class App extends Component {

  // isMobile?
  changeMobile = () => {
    window.matchMedia('(max-width: 768px)').matches
      ? this.props.onChangeMobile(true)
      : this.props.onChangeMobile(false)
  }; 

  componentDidMount () {
    this.changeMobile();
    window.addEventListener('resize', this.changeMobile);
    this.props.onFetchMoviesGenre();
    this.props.onFetchMovies();
    // return () => window.removeEventListener('resize', this.changeMobile);
  }

  
  render() {
    return (
      <Layout>
        <Header isMobile={this.props.isMobile} />
        <Route path="/" component={Main} />
      </Layout>
    );
  }
}


const mapStateToProps = state => {
  return {
    isMobile: state.navigation.mobile,
    loading: state.navigation.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeMobile: mobile => dispatch(actions.change_mobile(mobile)),
    onFetchMovies: () => dispatch(actions.fetch_movies()),
    onFetchMoviesGenre: () => dispatch(actions.fetch_movies_genre())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);