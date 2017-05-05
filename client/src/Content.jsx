import React, { Component } from 'react';
import CpuComponent from './Cpu.jsx';
import PkgComponent from './Pkg.jsx';
import { Cpu, Pkg } from './chart.js';

const socket = require('socket.io-client')('http://localhost:3000');

let cpu, pkg;

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: true,
      cpuLine: [],
      cpuDelta: {},
      pkgLines: {},
      pkgRatio: {}     
    }
  }

  componentDidMount() {
    cpu = new Cpu(30);
    pkg = new Pkg(20);

    socket.on('data', (data) => {
      let json = JSON.parse(data);

      this.setState({ 
        cpuLine:  cpu.getLine(json.cpu),
        cpuDelta: cpu.getDelta(),
        pkgLines: pkg.getLines(json.pkg.idle, json.pkg.sent),
        pkgRatio: pkg.getRatio()  
      });

      cpu.ticking();
      pkg.ticking();
    })
  }

  render() {
    return (
      <div>  
        {!this.props.trigger && <CpuComponent cpuLine={this.state.cpuLine} cpuDelta={this.state.cpuDelta} />}
        {this.props.trigger && <PkgComponent pkgLines={this.state.pkgLines} pkgRatio={this.state.pkgRatio} />}
      </div>  
    )
  }
}   