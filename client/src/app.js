import React, { Component } from 'react';
import { render } from 'react-dom'; 

import Header from './Header.jsx';
import Content from'./Content.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trigger: false
    }
  }

  onChildChanged(newState) {
    this.setState({trigger: newState})
  }

  render() {
    return (
      <div className="app">
        <Header greeting="Welcome To The System Monitor App!" cb={this.onChildChanged.bind(this)} />
        <Content trigger={this.state.trigger} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));