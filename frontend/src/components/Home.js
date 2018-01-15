import React, { Component } from 'react';
import Header from './Header';
import User from './User';

class Home extends Component {
  render() {
    return (
      <div className="jumbotron">
        <Header />
        <h1> Home page </h1>
        <User />
      </div>
    );
  }
}

export default Home;
