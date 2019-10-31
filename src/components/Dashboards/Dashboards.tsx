import * as React from "react";

import LeafArea from './dashboardsTypes/LeafArea/LeafArea';
import Overall from './dashboardsTypes/Overall/Overall';
import GreenFreq from './dashboardsTypes/GreenFrequency/GreenFrequency';
import YellowFreq from './dashboardsTypes/YellowFrequency/YellowFrequency';
import LinearTreatment from './dashboardsTypes/LinearTreatments/LinearTreatments';
import { DashboardType } from './dashboardsTypes/InterfaceDashboardTypes';

import DashboardSelector from './components/DashboardSelector/DashboardSelector';
import linearTreatmentType from "./dashboardsTypes/LinearTreatments/LinearTreatments";

interface IDashboardsState{
  assayId: string,
  currentDashboard: DashboardType,
  dashboardsData: { [key:string]: Array<number> }
}

interface IDashboardProps {
  match: {
    params: { assayId: string },
  },
}

interface Dashboards extends React.Component<IDashboardProps, IDashboardsState> {
  dashboardTypes: Array<DashboardType>
}

/*Mock data*/ 
const tags = ["Importante","Corto","Secuencial"];

class Dashboards extends React.Component<IDashboardProps, IDashboardsState> {

  constructor(props:IDashboardProps){
    super(props)

    this.dashboardTypes = [
      Overall,
      LeafArea,
      YellowFreq,
      GreenFreq,
      LinearTreatment
    ];

    this.state = {
      assayId: props.match.params.assayId,
      currentDashboard: this.dashboardTypes[0],
      dashboardsData: this.dashboardTypes.reduce((acc:{ [key:string]: Array<number> }, dash) => {
        acc[dash.id] = []; return acc }, {}
      ),
    };
    this.fetchDataFromdashboards();
  }

  fetchDataFromdashboards() {
    const componentsToFetch : Set<DashboardType> = new Set([this.state.currentDashboard, ...this.dashboardTypes]);
    componentsToFetch.forEach(({component, id: dashboardId}) => {
      component.fetchData(this.props.match.params.assayId)
        .then(data => this.storeDataFromDashboard(data, dashboardId));
    });
  }

  storeDataFromDashboard(data:any, dashboardId: DashboardType["id"]) {
    this.setState({
      dashboardsData: {
        ...this.state.dashboardsData,
        [dashboardId]: data,
      }
    })
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

    // Special case
    if (type.id === 'overall') return <Dashboard onEmptyRender={this.renderEmptyDashboard} data={this.state.dashboardsData} />
    
    return <Dashboard onEmptyRender={this.renderEmptyDashboard} data={this.state.dashboardsData[type.id]} />;
  }

 

  render(){      
    return (
      <div className="Dashboard">
        <div className="dashboard-header">
          <div className="dashboard-tags">
            {tags.map(tag => {return <div className="tag">{tag}</div>})}
          </div>
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <h2>Ensayo {this.state.assayId}</h2>
          </div>
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
