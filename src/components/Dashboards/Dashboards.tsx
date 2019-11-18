import * as React from "react";

import LeafArea from './dashboardsTypes/LeafArea/LeafArea';
import Overall from './dashboardsTypes/Overall/Overall';
import GreenFreq from './dashboardsTypes/GreenFrequency/GreenFrequency';
import YellowFreq from './dashboardsTypes/YellowFrequency/YellowFrequency';
import LinearTreatment from './dashboardsTypes/LinearLeafAreaTreatments/LinearLeafAreaTreatments';
import LeafAreaPerExperiments from './dashboardsTypes/LeafAreaPerExperiments/LeafAreaPerExperiments';
import { DashboardType } from './dashboardsTypes/InterfaceDashboardTypes';

import DashboardSelector from './components/DashboardSelector/DashboardSelector';
import Info from "../Utilities/Messages/Info";
import BushService from "../../services/bush";
import { ITag } from "../../Interfaces/Tags";
import { IEnsayo } from "../../Interfaces/IEnsayo";
import Loader from "../Utilities/Loader/Loader";
interface IDashboardsState{
  assay:IEnsayo,
  tags: Array<ITag>
  currentDashboard: DashboardType,
  dashboardsData: { [key:string]: Array<number> },
  dashboardsLoading: { [key:string]: boolean },
  treatments: { [key:string]: string},
  lastDateWithData: string,
  range: Array<any>
}

interface IDashboardProps {
  match: {
    params: { assayId: string },
  },
}

const isDate = (data) => data && data.length && (/\d{0,4}-\d{1,2}-\d{1,2}/g).test(data);

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
      LinearTreatment,
      LeafAreaPerExperiments
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
      tags:[],
      treatments: {},
      lastDateWithData: '',
      range: []
    };
    this.fetchDataFromdashboards();
    this.fetchTags();
    this.fetchAssay();
    this.fetchTreatments();
  }

  setLastDateWithData(date) {
    this.setState({
      lastDateWithData: date 
    })
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

  fetchTreatments(){
    BushService.get(`/ensayo/nombresTratamientos?idAssay=${this.props.match.params.assayId}`)
                .then(data => this.setState({treatments:data}))
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

    let date;

    if (data) {

      const firstLevelHasDates = Object.keys(data).find((el) => 
        isDate(el)
      );

      if (firstLevelHasDates) {
        date = Object.keys(data).sort((a:any, b:any) => a - b).slice(-1);
      } else {
        const secondLevelHasDates = Object.keys(Object.values(data)[0]).find((el) => (
          isDate(el)
        ));
        if (secondLevelHasDates) {
          date = Object.keys(data).sort((a:any, b:any) => a - b).slice(-1);
        }
      } 
  
      if (isDate(date)) {
        this.setLastDateWithData(date[0]);
      }
    }

    this.setState({
      dashboardsData: {
        ...this.state.dashboardsData,
        [dashboardId]: data,
      }
    })
  }

  setLoading(dashboardId:DashboardType["id"]){
    this.setState({
      dashboardsLoading: {
        ...this.state.dashboardsLoading,
        [dashboardId]:false
      }
    })
  }

  renderEmptyDashboard(id : DashboardType["id"],title:string, content: string) {
    
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
          <Info message={content || "Aún no contamos con datos para este ensayo, comienza a sacar fotos"}/>
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

    const lastDayWithDataMinusDays = ((daysToSubstract, lastDate) => {
      const lastDay = new Date(lastDate);
      return new Date(lastDay.setDate(lastDay.getDate()-daysToSubstract));
    });

    const isInvalidDate = !isDate(this.state.lastDateWithData);
    
    const lastDate = isInvalidDate ? new Date() : new Date(this.state.lastDateWithData);
    const range = [
      lastDayWithDataMinusDays(7, lastDate),
      lastDate,
    ];


    const dateRangeOptions = {
      type: 'date',
      xaxis: {
        range: [range[0].toISOString().slice(0,10), range[1].toISOString().slice(0,10)],
        rangeslider: {},
      }
    };

    // Special case
    if (type.id === 'overall') return <Dashboard dateRange={dateRangeOptions} onEmptyRender={this.renderEmptyDashboard.bind(this)} data={this.state.dashboardsData} />
    return <Dashboard dateRange={dateRangeOptions} onEmptyRender={this.renderEmptyDashboard.bind(this)} data={this.state.dashboardsData[type.id]} />;
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
