
import * as React from "react";
import * as leafAreaScript from './LeafAreaScript';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from "react-router"
import { DashboardType } from '../InterfaceDashboardTypes';

type AssayParamsType = {
    assayId: string,
  }
  
  export interface LeafAreaProps extends RouteComponentProps<AssayParamsType> {
    onEmptyRender: Function
  }
  

const name = "Área foliar";
class LeafArea extends React.Component<LeafAreaProps> {
    componentDidMount() {
        const s = document.createElement('script');
        s.setAttribute("id", 'nacho-script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = `(${leafAreaScript(this.props.match.params.assayId)})()`;
        document.body.appendChild(s);
    }
    
    componentWillUnmount() {
        document.getElementById('nacho-script').remove();
    }

    render() { return (
        <>
            <div id="chartContainer" style={{height: 370, width: '100%'}} />
            <div id='someDiv' />
        </>
    )}
};

const leafAreaType : DashboardType = {
    id: 'leaf-area',
    name,
    component: withRouter(LeafArea),
  };
  
  export default leafAreaType;
  