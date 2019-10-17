import * as React from "react";
import Ensayos from './components/Ensayos/Ensayos';
import { IEnsayo } from '../../Interfaces/IEnsayo';
import { RouteComponentProps } from 'react-router-dom';
import { buildUrl } from "../Utilities/QueryParamsURLBuilder";
import BushService from '../../services/bush';
import Spinner from "react-spinner-material";

export interface IHomesState {
    ensayos: Array<IEnsayo>,
    experimentos: Array<object>,
    showDataUploadMenu: boolean,
    loading:boolean,
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
            loading:true
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
        BushService.get('/ensayos')
            .then(ensayos => {
                this.setState({
                    ...this.state,
                    loading:false,
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
        BushService.get(`/experimentosDe?assayId=${assayId}`)
            .then((experimentos: any) => {
                this.setState({
                    ...this.state,
                    experimentos,
                })
            });
    }

    private removeAssay(assayId: IEnsayo['idAssay']){
        BushService.delete(buildUrl('/ensayos/eliminar',{
            assayId:assayId
         }))
    }


    render(){
        return(
            <div className="home">
               
                <div className="home-title">
                    Selecciona el ensayo que deseas ver:
                </div>
                
                {!this.state.loading?
                <Ensayos ensayos={this.state.ensayos} 
                         onSelect={this.goToDashboard.bind(this)}  
                         onQrs={this.goToQrs.bind(this)}
                         onRemove={this.removeAssay.bind(this)} />
                :
                <div className="home-loading">
                    <Spinner size={240} 
                        spinnerColor={"#6AC1A9"} 
                        spinnerWidth={3} 
                        visible={true}/>
                </div>
                }
            </div>
        )
    }
}

export default Homes;
