import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell} from 'recharts';

export default class Content extends Component {
  render() {
      return (
        <div className="container-fluid">
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-6">
              <div className="content">
                <LineChart 
                  width={600} 
                  height={300} 
                  data={[].concat(this.props.pkgLines).map((elm, ind) => {
                    return {
                      name: ind * 10,
                      idle: elm.idle,
                      sent: elm.sent
                    }
                  })}
                  margin={{top: 0, right: 5, left: 5, bottom: 5}}>
                 <XAxis dataKey="name"/>
                 <YAxis/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Line
                  isAnimationActive={false} 
                  type="monotone" 
                  dataKey="idle" 
                  stroke="#8884d8"
                  dot={false}
                  activeDot={false}/>
                <Line 
                  isAnimationActive={false} 
                  type="monotone" 
                  dataKey="sent" 
                  stroke="#82ca9d"
                  dot={false}
                  activeDot={false}/>
                </LineChart>
              </div>
            </div>

            <div className="col-md-2"></div>
            <div className="col-md-4">  
              <PieChart width={300} height={300}>
                <Pie
                  isAnimationActive={false} 
                  data={[
                    {name: 'idle', value: this.props.pkgRatio.idle}, 
                    {name: 'sent', value: this.props.pkgRatio.sent}
                  ]} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={30} 
                  fill="#8884d8"
                  label>
                    <Cell fill="#8884d8" />
                    <Cell fill="#82ca9d" /> 
                 </Pie>
              </PieChart>
            </div>

          </div>
        </div>   
      );
    }
}    