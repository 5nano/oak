import * as React from "react";
import Ensayos from './components/Ensayos/Ensayos';
import { IEnsayo } from '../../Interfaces/IEnsayo';
import { RouteComponentProps } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export interface IHomesState {
    ensayos: Array<IEnsayo>,
    experimentos: Array<object>,
    showDataUploadMenu: boolean,
}


export interface IHomesProps extends RouteComponentProps {

}

export class Homes extends React.Component<IHomesProps,IHomesState> {


    constructor(props: IHomesProps){
        super(props);
        this.state ={
            ensayos: [],
            experimentos: [],
            showDataUploadMenu: false,
        };
        this.fetchEnsayos();
        this.goToDashboard = this.goToDashboard.bind(this);
        this.showDataUploadMenu = this.showDataUploadMenu.bind(this);
    }

    private showDataUploadMenu(event: any) {
        event.preventDefault();
        this.setState({
            showDataUploadMenu: !this.state.showDataUploadMenu,
        });
    }
    private fetchEnsayos = async (): Promise<void> => {
       fetch('https://nanivo-bush.herokuapp.com/ensayos',{
           method:'GET',
           mode:'cors',
           headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
        .then(response => response.json())
        .then(ensayos => {
            this.setState({
                ...this.state,
                ensayos
            });
        })
      }

    private goToDashboard(assayId: IEnsayo["idAssay"]){
        this.props.history.push(`/assay/${assayId}/dashboard`);
    }

    private goToQrs(assayId: IEnsayo["idAssay"]){
        this.props.history.push(`/assay/${assayId}/qrs`);
    }

    private showExperimentos = async (assayId: number): Promise<void> => {
        /**
         * Currently unused, we'll probably want to show some info like experiment count in the future
         */
        fetch(`https://nanivo-bush.herokuapp.com/experimentosDe?assayId=${assayId}`,{
            method:'GET',
            mode:'cors',
            headers: {
             'Content-Type': 'application/json',
             Accept: 'application/json'
           }
        })
            .then(res => res.json())
            .then((experimentos: any) => {
                this.setState({
                    ...this.state,
                    experimentos,
                })
            });
    }


    render(){
        return(
            <div className="home">
                <div className="home-title">Selecciona el ensayo que deseas ver:</div>
                <Ensayos ensayos={this.state.ensayos} 
                         onSelect={this.goToDashboard.bind(this)}  
                         onQrs={this.goToQrs.bind(this)} />
            </div>
        )
    }
}

export default Homes;
