import * as React from "react";
import Ensayos from './components/Ensayos/Ensayos';
import { IEnsayo } from '../../Interfaces/IEnsayo';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../services/bush';
import HomeSearcher from "./components/HomeSearcher/HomeSearcher";
import Loader from "../Utilities/Loader/Loader";
import Tabs from "./components/Tabs/tabs";
import AssayFeedback from "../Feedback/AssayFeedback";
import { Snackbar } from "@material-ui/core";
import MySnackbarContentWrapper, { Feedback } from "../Feedback/MySnackbarContentWrapper";


export type assayState = 'ALL' | 'ACTIVE' | 'FINISHED' | 'ARCHIVED';

const assayStates: assayState[] = ['ALL','ACTIVE','FINISHED',"ARCHIVED"]

export interface IHomeState {
    assays: Array<IEnsayo>,
    filteredAssays: Array<IEnsayo>,
    experimentos: Array<object>,
    showDataUploadMenu: boolean,
    loading:boolean,
    state: assayState,
    assayToFinish:Number,
    feedback:Feedback
}

export interface IHomeContext extends IHomeState {
    updateAssays:Function;
    finishAssay:Function;
    setFeedback:(feedback:Feedback) => void
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
            state: 'ALL',
            assayToFinish: null,
            feedback:null
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
                this.setState({
                    ...this.state,
                    loading:false,
                    assays,
                    filteredAssays:assays
                });
                
            })
      }
      
    private handleTab(state:assayState){
        this.fetchEnsayos(state)
    }

    private updateAssays(){
        this.fetchEnsayos(this.state.state)
    }

    private requestFinishAssay(idAssay:Number):void {
        this.setState({assayToFinish:idAssay})
    }

    private finishAssay(stars:Number,comments:string):Promise<void>{
        return BushService.patch(`/ensayo/terminar?idAssay=${this.state.assayToFinish}&&stars=${stars}&&comments=${comments}`)
        .then(()=>{
            this.closeAssayFeedback()
            this.setFeedback({variant:'success',message:'Ensayo finalizado exitosamente'})


        })
    }

    private sendAssayFinishedEmail = () => {
        let htmlToSend = {
            subject: `El ensayo ${this.state.assayToFinish} ha finalizado`,
            html:"<html><img src='https://ibb.co/92QcCXD'/></html>",
        }
    
        BushService.post(`/mailSender?treatmentName=harcodeado&&assayId=${3}`,htmlToSend)
                  .then(()=> {
                    console.log("Email enviado")
                  })
    }

    private closeAssayFeedback():void{
        this.setState({assayToFinish:null})
       

    }

    private setFilteredAssays(filteredAssays:Array<IEnsayo>){
        this.setState({
            ...this.state,
            filteredAssays
        })
    }

    private setLoading(value:boolean):void {
        this.setState({loading:value})
    }


    private handleSnackbarClose(event?: React.SyntheticEvent,reason?:string) {
        if (reason ==='clickaway') { 
            return;
        }
        this.setState({feedback:null})
    }

    private setFeedback(feedback:Feedback){
        this.setState({feedback:feedback})
    }
    render(){
        const context: IHomeContext = {
            ...this.state,
            updateAssays:this.updateAssays.bind(this),
            finishAssay:this.requestFinishAssay.bind(this),
            setFeedback:this.setFeedback.bind(this)
          };
        return(
            
            <div id="home" className="home">
             
                <Tabs assayStates={assayStates}
                      handleTab={this.handleTab.bind(this)}
                      />
        
                <HomeSearcher setFilteredAssays={this.setFilteredAssays.bind(this)}
                                setLoading={this.setLoading.bind(this)}/>

                {this.state.assayToFinish!=null &&
                    <AssayFeedback idAssay={this.state.assayToFinish}
                                   finishAssay={this.finishAssay.bind(this)}
                                   closeFeedback={this.closeAssayFeedback.bind(this)}
                                    />
                                }
                

                {!this.state.loading?
                    <HomeContext.Provider value={context}>
                        <Ensayos {...this.props} ensayos={this.state.filteredAssays} />
                    </HomeContext.Provider>
                :<Loader/>

                }
                <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={this.state.feedback!=null}
                autoHideDuration={6000}
                onClose={this.handleSnackbarClose.bind(this)}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleSnackbarClose.bind(this)}
                        variant={this.state.feedback? this.state.feedback.variant : 'success'}
                        message={this.state.feedback? this.state.feedback.message:''}/>
                </Snackbar>
            </div>
        )
    }
}

export default Homes;
