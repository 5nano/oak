import * as React from "react";
import { IEnsayo } from '../../Interfaces/IEnsayo';
import { RouteComponentProps } from 'react-router-dom';
import BushService from '../../services/bush';
import HomeSearcher from "./components/HomeSearcher/HomeSearcher";
import Loader from "../Utilities/Loader/Loader";
import Tabs from "./components/Tabs/tabs";
import AssayFeedback from "../Feedback/AssayFeedback";
import { Snackbar } from "@material-ui/core";
import MySnackbarContentWrapper, { Feedback } from "../Feedback/MySnackbarContentWrapper";
import Info from "../Utilities/Messages/Info";
import Ensayo from "./components/Ensayo/Ensayo";


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
                console.log(assays)
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
        let assayId = this.state.assayToFinish;
        return BushService.patch(`/ensayo/terminar?idAssay=${this.state.assayToFinish}&&stars=${stars}&&comments=${comments}`)
        .then(()=>{
            this.closeAssayFeedback()
            this.sendAssayFinishedEmail(assayId,stars)
            this.setFeedback({variant:'success',message:'Ensayo finalizado exitosamente. Revisa tu casilla de correo electrónico'})
            this.updateAssays()
        })
        .catch(error => {
            this.setFeedback({variant:'error',message:'El ensayo ya se encuentra finalizado'})
        })
    }
    private sendAssayFinishedEmail = (assayId: Number,stars:Number) => {
        
        let assay = this.state.assays.find(assay => assay.idAssay === assayId)
        let createdDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.parse(assay.created))

        let htmlToSend = {
            subject: `El ensayo ${assay.name} creado el ${createdDate} ha finalizado con ${stars} estrellas `,
            html:"<html><img src=https://ibb.co/92QcCXD/></html>",
        }
    
        BushService.post("/mailSender",htmlToSend)
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
                         <div className="ensayos">
                            {this.state.assays.length === 0 && 
                            <Info message="No se registran ensayos en este estado"/>}
                            {this.state.assays.map((ensayo: IEnsayo) => (
                                <Ensayo {...this.props} ensayo={ensayo} />
                            ))}
                         </div>
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
