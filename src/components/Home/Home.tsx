import * as React from "react";
import Ensayos from './components/Ensayos/Ensayos';
import { IEnsayo } from '../../Interfaces/IEnsayo';
import { RouteComponentProps } from 'react-router-dom';
import { buildUrl } from "../Utilities/QueryParamsURLBuilder";
import BushService from '../../services/bush';
import Spinner from "react-spinner-material";
import HomeSearcher from "./components/HomeSearcher/HomeSearcher";
import Loader from "../Utilities/Loader/Loader";
import Tabs from "./components/Tabs/tabs";

export type assayState = 'ALL' | 'ACTIVE' | 'FINISHED' | 'ARCHIVED';

const assayStates: assayState[] = ['ALL','ACTIVE','FINISHED',"ARCHIVED"]
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
        ;
        this.goToDashboard = this.goToDashboard.bind(this);
        this.showDataUploadMenu = this.showDataUploadMenu.bind(this);
    }
    
    componentDidMount(){
        this.fetchEnsayos('ALL')
    }

    private showDataUploadMenu(event: any) {
        event.preventDefault();
        this.setState({
            showDataUploadMenu: !this.state.showDataUploadMenu,
        });
    }
    
    private fetchEnsayos = async (state:assayState): Promise<void> => {
        this.setState({loading:true})
        BushService.get(`/ensayos?state=${state}`)
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

    private goToTreatments(assayId: IEnsayo["idAssay"]){
        this.props.history.push(`/assay/${assayId}/treatments`);
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


    private handleTab(state:assayState){
        this.fetchEnsayos(state)
    }

    render(){
        return(
            <div className="home">
             
                <Tabs assayStates={assayStates}
                      handleTab={this.handleTab.bind(this)}
                      />
        
                <HomeSearcher/>

                {!this.state.loading?
                <Ensayos ensayos={this.state.ensayos} 
                onSelect={this.goToDashboard.bind(this)}  
                onQrs={this.goToQrs.bind(this)}
                onRemove={this.removeAssay.bind(this)} 
                onTreatments={this.goToTreatments.bind(this)}/>
                :<Loader/>
                }
            </div>
        )
    }
}

export default Homes;
