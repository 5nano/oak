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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EcoIcon from '@material-ui/icons/Eco';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { RouteComponentProps } from "react-router-dom";
const qs = require('qs');

interface IDashboardsState{
  assay:IEnsayo,
  tags: Array<ITag>
  currentDashboard: DashboardType,
  dashboardsData: { [key:string]: Array<number> },
  dashboardsLoading: { [key:string]: boolean },
  treatments: { [key:string]: string},
  lastDatesWithData: Array<string>,
  range: Array<any>,
  metrics:Metrics
}

interface Metrics {
  photosLength: Number,
  experimentsLength: Number,
  treatmentsLength: Number
}

interface MatchParams {
  assayId: string;
}

interface IDashboardProps {
  match: {
    params: { assayId: string,},    
  },
  location: {
    search: string,
  },
  history: {
    push: Function,
    replace: Function
  }
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
    const initialQuery = qs.parse(this.props.location.search.slice(1));
    let selectedDashboard = initialQuery['type'] && initialQuery['type'];
    selectedDashboard = this.dashboardTypes.find(d => d.id === selectedDashboard) && this.dashboardTypes.find(d => d.id === selectedDashboard).id;
    if (!selectedDashboard) {
      selectedDashboard = this.dashboardTypes[0].id;
      this.props.location.search = qs.stringify({ type: selectedDashboard });
      this.props.history.replace(`?${this.props.location.search}`);
    }
    this.state = {
      assay: null,
      currentDashboard: this.dashboardTypes.find(d => d.id === selectedDashboard),
      dashboardsData: this.dashboardTypes.reduce((acc:{ [key:string]: Array<number> }, dash) => {
        acc[dash.id] = []; return acc }, {}
      ),
      dashboardsLoading: this.dashboardTypes.reduce((acc:{ [key:string]:boolean} ,dash) => {
        acc[dash.id] = true; return acc},{}
        ),
      tags:[],
      treatments: {},
      lastDatesWithData: [],
      range: [],
      metrics: null
    };
    this.fetchDataFromdashboards();
    this.fetchTags();
    this.fetchAssay();
    this.fetchTreatments();
    this.fetchMetrics();
  }

  setLastDatesWithData(dates) {
    this.setState({
      lastDatesWithData: dates 
    })
  }

  fetchMetrics(){
    BushService.get(`/ensayo/minimalInfo?idAssay=${this.props.match.params.assayId}`)
               .then(data => {
                this.setState({metrics:data})
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
                  console.log(data)
                  this.setState({assay:data})
                })
  }

  fetchTreatments(){
    BushService.get(`/ensayo/nombresTratamientos?idAssay=${this.props.match.params.assayId}`)
                .then(data =>{ 
                  this.setState({treatments:data})
                  console.log(data)
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
                .catch(error => {
                  this.setLoading(dashboardId)
                })
               
    });
  }

  storeDataFromDashboard(data:any, dashboardId: DashboardType["id"]) {

    let dates;

    if (data) {

      const firstLevelHasDates = Object.keys(data).find((el) => 
        isDate(el)
      );

      if (firstLevelHasDates) {
        dates = Object.keys(data);
      } else {
        const secondLevelHasDates = Object.keys(Object.values(data)[0]).find((el) => (
          isDate(el)
        ));
        if (secondLevelHasDates) {
          dates = Object.keys(data);
        }
      } 
      
      if (dates && isDate(dates[0])) {
        this.setLastDatesWithData(dates);
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
      <div className="info-content">
        <div style={{width:'200px'}} className="info-content-image">
          <img  style={{opacity:0.5}}src='../../../assets/images/empty-dashboard.png'/>
        </div>
        <div className="info-content-description">
          <h2>{title}</h2>
          <p>Todavía no has tomados fotos para visualizar este gráfico.</p>
        </div>
      </div>

    )
  }

  setDashboard(idDashboardType: DashboardType["id"]) {
    this.setState({
      currentDashboard: this.dashboardTypes.find(dash => dash.id === idDashboardType),
    }, () => {
      this.props.location.search = qs.stringify({ type: idDashboardType });
      this.props.history.replace(`?${this.props.location.search}`);
    })
  }

  renderDashboard(type : DashboardType) {
    const Dashboard = type.component;

    const lastDayWithDataMinusDays = ((daysToSubstract, lastDate) => {
      const lastDay = new Date(lastDate);
      return new Date(lastDay.setDate(lastDay.getDate()-daysToSubstract));
    });

    const isInvalidDate = !isDate(this.state.lastDatesWithData[0]);
    
    const lastDate = isInvalidDate ? new Date() : new Date(this.state.lastDatesWithData.slice(-1)[0]);

    const isShortRange = (datesList) => {
      const singleDate = datesList.length === 1;
      const sameYear = datesList.map((date) => date.slice(0,7)).every( (date, i, arr) => date === arr[0] );
      const sortedDays = datesList.slice(-2).map(Number).sort((a,b) => a-b);
      const daysRange = sortedDays[sortedDays.length-1] - sortedDays[0];

      return singleDate || (sameYear && daysRange < 7);
    }
    
    const range = [
      lastDayWithDataMinusDays(7, lastDate),
      new Date(lastDate.setDate(lastDate.getDate() + 1))
    ];


    const dateRangeOptions = {
      type: 'date',
      xaxis: {
        autorange: isShortRange(this.state.lastDatesWithData),
        range: isShortRange(this.state.lastDatesWithData) ? null : [range[0].toISOString().slice(0,10), range[1].toISOString().slice(0,10)],
        rangeslider: {},
      }
    };

    

    // Special case
    if (type.id === 'overall') return <Dashboard dateRange={dateRangeOptions} onEmptyRender={this.renderEmptyDashboard.bind(this)} data={this.state.dashboardsData} treatments={this.state.treatments}/>
    return <Dashboard dateRange={dateRangeOptions} onEmptyRender={this.renderEmptyDashboard.bind(this)} data={this.state.dashboardsData[type.id]} treatments={this.state.treatments} />;
  }

 

  render(){  
    
      
    return (
      <div className="Dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-basic">
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


          {this.state.metrics != null && 
          <div className="dashboard-header-metrics">
              <div className="assay-dashboard-card">
                <div className="assay-dashboard-card-wrapper">
                    <div className="assay-dashboard-card-header">
                        <PhotoCameraIcon/>
                        <h3>Cantidad de fotos</h3>
                    </div>
                    <div className="assay-dashboard-card-content">
                        {this.state.metrics.photosLength}
                    </div>
                      <div className="assay-dashboard-card-actions">
                          <Button onClick={(e) => this.props.history.push(`/photos?assay=${this.props.match.params.assayId}`)} size="small" >Ir a imágenes</Button>
                      </div>
                  </div>
              </div>
              <div className="assay-dashboard-card">
                <div className="assay-dashboard-card-wrapper">
                    <div className="assay-dashboard-card-header">
                        <ViewModuleIcon/>
                        <h3>Cantidad de tratamientos</h3>
                    </div>
                    <div className="assay-dashboard-card-content">
                        {this.state.metrics.treatmentsLength}
                    </div>
                    <div className="assay-dashboard-card-actions">
                        <Button
                          onClick={(e) => this.props.history.push(`/assay/${this.props.match.params.assayId}/treatments`)}
                          size="small">Ir a tratamientos</Button>
                    </div>
                  </div>
              </div>
              <div className="assay-dashboard-card">
                <div className="assay-dashboard-card-wrapper">
                    <div className="assay-dashboard-card-header">
                        <EcoIcon/>
                        <h3>Cantidad de plantas</h3>
                    </div>
                    <div className="assay-dashboard-card-content">
                        {this.state.metrics.experimentsLength}
                    </div>
                  </div>
              </div>
          </div>
          }
        </div>
        <div className="dashboard-container">
          <div className="row">
            <DashboardSelector 
              dashboardTypes={this.dashboardTypes} 
              onSelect={this.setDashboard.bind(this)}
              currentSelection={this.state.currentDashboard}
            />
          </div>
          <div className="row">
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
