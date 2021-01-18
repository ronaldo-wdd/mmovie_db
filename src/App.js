import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Header from './components/Navigation/Header/Header';
import AllMovies from './containers/AllMovies/AllMovies';


class App extends Component {
  state = {
    isMobile: false
  }

  // isMobile?
  changeMobile = () => {
    window.matchMedia('(max-width: 768px)').matches
      ? this.setState({isMobile: true})
      : this.setState({isMobile: false})
  }; 

  componentDidMount () {
    this.changeMobile();
    window.addEventListener('resize', this.changeMobile);
    // return () => window.removeEventListener('resize', this.changeMobile);
  }

  
  render() {
    return (
      <Layout>
        <Header isMobile={this.state.isMobile} />
        <Route path="/" component={AllMovies} />
      </Layout>
    );
  }
}

export default App;