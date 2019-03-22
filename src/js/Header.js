import React, { Component } from 'react';
import '../css/Header.css';

class Header extends Component {
    render() {
      return (
        <div className="header">
            <header className="App-header">
                <div className="header-text">
                    Front-end Engineer Code Challenge
                </div>
            </header>
        </div>
      );
    }
  }

export default Header;