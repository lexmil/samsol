import React, { Component } from 'react';

export default class Sidebar extends Component {
  onClickCpu(e) {
    e.preventDefault();
    this.props.cb(true);
  }

  onClickPkg(e) {
    e.preventDefault();
    this.props.cb(false);
  }

  render() {
    return (
      <div className="btn-group navbar-fix navbar-right" role="group">
        <button onClick={this.onClickCpu.bind(this)} type="button" className="btn btn-default">CPU</button>
        <button onClick={this.onClickPkg.bind(this)} type="button" className="btn btn-default">PKG</button>
      </div>
    );
  }
}