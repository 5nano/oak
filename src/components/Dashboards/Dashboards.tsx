import * as React from "react";
import UserSearch from '../Users/UserSearch';
import Register from "../Users/Register";

import CrudView from '../CRUD/CrudView';

import Plot from 'react-plotly.js';

const Dashboards: React.SFC = () => {
  /*var trace1 = {
    x: [1, 2, 3, 4, 4, 4, 8, 9, 10],
    type: 'box',
    name: 'Set 1'
  };

  var trace2 = {
    x: [2, 3, 3, 3, 3, 5, 6, 6, 7],
    type: 'box',
    name: 'Set 2'
  };

  var data = [trace1, trace2];

  var layout = {
    title: 'Horizontal Box Plot'
  };*/
  return (
       <Plot
         data={[
           {
             x: [1, 2, 3],
             y: [2, 6, 3],
             type: 'scatter',
             mode: 'lines+points',
             marker: {color: 'red'},
           },
           {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
         ]}
         layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
       />
     );
};

export default Dashboards;
