import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";

import Layout from './hoc/Layout/Layout';
import Header from './components/Navigation/Header/Header';
// import Footer from './components/Navigation/Footer/Footer';
import * as actions from './store/actions';
import Backdrop from './components/Sections/Backdrop/Backdrop';
import AnimatedRoutes from './hoc/AnitamatedRoutes/AnimatedRoutes';


class App extends Component {
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
  }

  
  render() {
    return (
      <Layout>
        <Header isMobile={this.props.isMobile} />
        <Backdrop />
        <Route render={({location}) => {
          return (
            <AnimatedRoutes location={location} />
          )
        }} />
        {/* <Footer /> */}
      </Layout>
    );
  }
}


const mapStateToProps = state => {
  return {
    isMobile: state.navigation.mobile,
    loaded: state.navigation.loaded
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