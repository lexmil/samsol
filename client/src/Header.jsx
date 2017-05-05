import React, { Component } from 'react';
import Sidebar from './Sidebar.jsx';

export default class Header extends Component {
  constructor() {
    super();
  }

  onChildChanged(newState) {
    this.props.cb(!newState);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <span className="brand-first">system</span>
              <span className="brand-second">monitor</span>
            </a>
          </div>
          <p className="navbar-text">{this.props.greeting}</p>
          <Sidebar cb={this.onChildChanged.bind(this)} />
        </div>
      </nav>
    );
  }  
}