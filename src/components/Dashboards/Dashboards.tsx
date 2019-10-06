import * as React from "react";

import YellowFreq from './dashboardsTypes/YellowFreq/YellowFreq';
import LeafArea from './dashboardsTypes/LeafArea/LeafArea';

import { DashboardType } from './dashboardsTypes/InterfaceDashboardTypes';
import { RouteComponentProps } from 'react-router-dom';

import DashboardSelector from './components/DashboardSelector/DashboardSelector';

interface IDashboardsState{
  assayId: string,
  currentDashboard: DashboardType,
}

interface IDashboardProps {
  match: {
    params: { assayId: string },
  },
}

interface Dashboards extends React.Component<IDashboardProps, IDashboardsState> {
  dashboardTypes: Array<DashboardType>
}


class Dashboards extends React.Component<IDashboardProps, IDashboardsState> {

  constructor(props:IDashboardProps){
    super(props)

    this.state = {
      assayId: props.match.params.assayId,
      currentDashboard: YellowFreq,
    }
    this.dashboardTypes = [
      YellowFreq,
      LeafArea
    ]
  }


  renderEmptyDashboard() {
    return (
      <div className="no-data-yet">
          Aún no contamos con datos para este ensayo, comienza a sacar fotos
      </div>
    )
  }

  setDashboard(idDashboardType: DashboardType["id"]) {
    this.setState({
      currentDashboard: this.dashboardTypes.find(dash => dash.id === idDashboardType),
    })
  }

  renderDashboard(type : DashboardType) {
    const Dashboard = type.component;
    return <Dashboard onEmptyRender={this.renderEmptyDashboard} />;
  }

  render(){      
    return (
      <div className="Dashboard">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <h2>Ensayo {this.state.assayId}</h2>
        </div>
        <div className="dashboard-container">
          <div className="left-column">
            <DashboardSelector 
              dashboardTypes={this.dashboardTypes} 
              onSelect={this.setDashboard.bind(this)}
              currentSelection={this.state.currentDashboard}
            />
          </div>
          <div className="right-column">
            {
              this.renderDashboard(this.state.currentDashboard)
            }
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboards;
