import * as React from "react";

import LeafArea from './dashboardsTypes/LeafArea/LeafArea';
import Overall from './dashboardsTypes/Overall/Overall';
import GreenFreq from './dashboardsTypes/GreenFrequency/GreenFrequency';
import YellowFreq from './dashboardsTypes/YellowFrequency/YellowFrequency';
import LinearTreatment from './dashboardsTypes/LinearLeafAreaTreatments/LinearLeafAreaTreatments';
import { DashboardType } from './dashboardsTypes/InterfaceDashboardTypes';

import DashboardSelector from './components/DashboardSelector/DashboardSelector';
import Info from "../Utilities/Messages/Info";
import BushService from "../../services/bush";
import { ITag } from "../../Interfaces/Tags";
import { IEnsayo } from "../../Interfaces/IEnsayo";
import Loader from "../Utilities/Loader/Loader";
var randomColor = require('randomcolor');
interface IDashboardsState{
  assay:IEnsayo,
  tags: Array<ITag>
  currentDashboard: DashboardType,
  dashboardsData: { [key:string]: Array<number> },
  dashboardsLoading: { [key:string]: boolean },
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

    this.dashboardTypes = [
      Overall,
      LeafArea,
      YellowFreq,
      GreenFreq,
      LinearTreatment
    ];

    this.state = {
      assay:null,
      currentDashboard: this.dashboardTypes[0],
      dashboardsData: this.dashboardTypes.reduce((acc:{ [key:string]: Array<number> }, dash) => {
        acc[dash.id] = []; return acc }, {}
      ),
      dashboardsLoading: this.dashboardTypes.reduce((acc:{ [key:string]:boolean} ,dash) => {
        acc[dash.id] = true; return acc},{}
        ),
      tags:[]
    };
    this.fetchDataFromdashboards();
    this.fetchTags();
    this.fetchAssay();
  }

  fetchTags() {
    BushService.get(`/ensayo/tags?idAssay=${this.props.match.params.assayId}`)
                .then((data:Array<ITag>)=> {
                  this.setState({tags:data})
                })
  }

  fetchAssay(){
    BushService.get(`/ensayo?idAssay=${this.props.match.params.assayId}`)
                .then((data:IEnsayo) => {
                  this.setState({assay:data})
                })
  }

  fetchDataFromdashboards() {
    const componentsToFetch : Set<DashboardType> = new Set([this.state.currentDashboard, ...this.dashboardTypes]);
    componentsToFetch.forEach(({component, id: dashboardId}) => {
      component.fetchData(this.props.match.params.assayId)
                .then(data => {
                  this.storeDataFromDashboard(data, dashboardId)
                  this.setLoading(dashboardId)
                })
               
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

  setLoading(dashboardId:DashboardType["id"]){
    console.log(dashboardId)
    this.setState({
      dashboardsLoading: {
        ...this.state.dashboardsLoading,
        [dashboardId]:false
      }
    })
  }

  renderEmptyDashboard(id : DashboardType["id"],title:string) {
    
    if(this.state.dashboardsLoading[id]) return (
      <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Loader/>
      </div>
      )
    return (
      <div className="empty-dashboard">
        <div className="empty-dashboard-title">
          <h4>{title}</h4>
        </div>
        <div className="empty-dashboard-content">
          <Info message="Aún no contamos con datos para este ensayo, comienza a sacar fotos"/>
        </div>
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
    if (type.id === 'overall') return <Dashboard onEmptyRender={this.renderEmptyDashboard.bind(this)} data={this.state.dashboardsData} />
    return <Dashboard onEmptyRender={this.renderEmptyDashboard.bind(this)} data={this.state.dashboardsData[type.id]} />;
  }

 

  render(){      
    return (
      <div className="Dashboard">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <h2>{this.state.assay && this.state.assay.name}</h2>
          </div>
          <div className="dashboard-tags">
            {this.state.tags.map(tag => {
              return <div className="assay-tag" style={{backgroundColor:tag.color}}>
                        {tag.name}
                     </div>
               })
            }
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
