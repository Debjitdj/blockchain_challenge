import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header.js';
import Body from './Body.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Body/>
      </div>
    );
  }
}

export default App;
