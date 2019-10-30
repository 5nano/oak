import * as React from "react";
import Ensayos from './components/Ensayos/Ensayos';
import { IEnsayo } from '../../Interfaces/IEnsayo';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../services/bush';
import HomeSearcher from "./components/HomeSearcher/HomeSearcher";
import Loader from "../Utilities/Loader/Loader";
import Tabs from "./components/Tabs/tabs";
import { IAssay } from "../Assay/Assay";

export type assayState = 'ALL' | 'ACTIVE' | 'FINISHED' | 'ARCHIVED';

const assayStates: assayState[] = ['ALL','ACTIVE','FINISHED',"ARCHIVED"]

export interface IHomeState {
    assays: Array<IEnsayo>,
    filteredAssays: Array<IEnsayo>,
    experimentos: Array<object>,
    showDataUploadMenu: boolean,
    loading:boolean,
    state: assayState
}

export interface IHomeContext extends IHomeState {
    updateAssays:Function;
  }
export const HomeContext = React.createContext<IHomeContext | undefined> (
undefined
);


export interface IHomesProps extends RouteComponentProps {
}

export class Homes extends React.Component<IHomesProps,IHomeState> {

    constructor(props: IHomesProps){
        super(props);
        this.state ={
            assays: [],
            filteredAssays: [],
            experimentos: [],
            showDataUploadMenu: false,
            loading:true,
            state: 'ALL'
        };
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
            .then((assays:Array<IEnsayo>) => {
                console.log(assays)
                
                this.setState({
                    ...this.state,
                    loading:false,
                    assays,
                    filteredAssays:assays
                });
                
            })
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


    private handleTab(state:assayState){
        this.fetchEnsayos(state)
    }

    private updateAssays(){
        this.fetchEnsayos(this.state.state)
    }

    private setFilteredAssays(filteredAssays:Array<IEnsayo>){
        this.setState({
            ...this.state,
            filteredAssays
        })
    }
    render(){
        const context: IHomeContext = {
            ...this.state,
            updateAssays:this.updateAssays.bind(this)
          };
        return(
            
            <div className="home">
             
                <Tabs assayStates={assayStates}
                      handleTab={this.handleTab.bind(this)}
                      />
        
                <HomeSearcher assays={this.state.assays}
                              setFilteredAssays={this.setFilteredAssays.bind(this)}/>

                {!this.state.loading?
                    <HomeContext.Provider value={context}>
                        <Ensayos {...this.props} ensayos={this.state.filteredAssays} />
                    </HomeContext.Provider>
                :<Loader/>
                }
            </div>
        )
    }
}

export default Homes;
