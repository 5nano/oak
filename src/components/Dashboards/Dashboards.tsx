import * as React from "react";

import Plot from 'react-plotlyjs-ts';
import { Layout } from "plotly.js";

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



  const data: Plotly.Data[] = [
    {
    x: [1, 2, 3],
    type: 'box',
    marker: {color: 'red'},
  },
  {
  x: [1, 2, 3,6,8,3,4,1,2,6,7,8],
  type: 'box',
  marker: {color: 'blue'},
  }
  ]

  const layout: Partial<Layout> = {
    annotations: [
      {
        text: 'simple-annotation',
        x: 0,
        xref: 'paper',
        y: 0,
        yref: 'paper'
      }
    ],
    title: 'simple-example',
    xaxis: {
      title: 'time'
    },
  };
  return (
       <Plot
         data={data}
         layout={layout}
       />
     );
};

export default Dashboards;
