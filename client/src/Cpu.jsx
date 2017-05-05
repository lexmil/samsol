import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class Content extends Component {
  render() {
      return (
        <div className="container-fluid">
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-6">
              <div className="content">
                <AreaChart 
                  width={600} 
                  height={300} 
                  data={this.props.cpuLine.map((elm, ind) => {
                    return { 
                      name: (ind.toString().length === 1) ? '0' + ind : ind, 
                      cpu: elm 
                    }
                  })}
                  margin={{top: 0, right: 5, left: 5, bottom: 5}}>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Area 
                  isAnimationActive={false} 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#8884d8"
                  dot={false}
                  activeDot={false}/>
                </AreaChart>
              </div>
            </div>

            <div className="col-md-2"></div>
            <div className="col-md-4">  
              <div className="panel panel-default">
                <div className="panel-heading">cpu, Δ</div>
                <div className="panel-body">{((this.props.cpuDelta.up) ? '🡑' : '🡓') 
                  + this.props.cpuDelta.value + ' (last 10 sec.)'}</div>
              </div>
            </div>

          </div>
        </div>   
      );
    }
}    