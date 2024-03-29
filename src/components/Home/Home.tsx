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
import { ITag } from "../../Interfaces/Tags";
import {AutocompleteTag} from './components/HomeSearcher/HomeSearcher';

export type assayState = 'ALL' | 'ACTIVE' | 'FINISHED' | 'ARCHIVED';

const assayStates: assayState[] = ['ALL','ACTIVE','FINISHED',"ARCHIVED"]

export interface IHomeState {
    assays: Array<IEnsayo>,
    filteredAssays: Array<IEnsayo>,
    selectedTags:Array<AutocompleteTag>,
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
            selectedTags: [],
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
        this.searchAssays([],'ALL')
    }

    

    private showDataUploadMenu(event: any) {
        event.preventDefault();
        this.setState({
            showDataUploadMenu: !this.state.showDataUploadMenu,
        });
    }
      
    private handleTab(state:assayState){
        
        this.searchAssays(this.state.selectedTags,state)
            .then(()=>{
                this.setState({state:state})
            })
    }

    private updateAssays(){
        this.searchAssays(this.state.selectedTags)
    }

    private requestFinishAssay(idAssay:Number):void {
        this.setState({assayToFinish:idAssay})
    }

    private finishAssay(stars:Number,comments:string):Promise<void>{
        console.log(stars,comments)
        let assayId = this.state.assayToFinish;
        return BushService.patch(`/ensayo/terminar?idAssay=${this.state.assayToFinish}&stars=${stars}&comments=${comments}`)
                            .then(()=>{
                                this.closeAssayFeedback()
                                this.sendAssayFinishedEmail(assayId,stars)
                                this.setFeedback({variant:'success',message:'Ensayo finalizado exitosamente. Revisa tu casilla de correo electrónico'})
                                this.updateAssays()
                            })
                            .catch(error => {
                                console.log(error)
                                this.closeAssayFeedback()
                                error.json().then((error)=>this.setFeedback({variant:'error',message:error.message}))
                            })
    }
    private sendAssayFinishedEmail = (assayId: Number,stars:Number) => {
        
        let assay = this.state.filteredAssays.find(assay => assay.idAssay === assayId)

        let htmlToSend = {
            subject: `El ensayo ${assay.name} ha finalizado con ${stars} estrellas `,
            html:"<html><img src='https://i.ibb.co/mtfbMsj/end-assay.jpg'/></html>",
        }
    
        BushService.post("/mailSender",htmlToSend)
                  .then(()=> {console.log("mail enviado")})
    }

    private closeAssayFeedback():void{
        this.setState({assayToFinish:null})
    }

    
    private setSelectedTags(selectedTags:Array<AutocompleteTag>){
        this.setState({selectedTags:selectedTags})
    }

    private searchAssaysByTags(selectedTags:Array<AutocompleteTag>,):Promise<Array<IEnsayo>>{
        let tags = selectedTags.map(tag => {return tag.value})
        
        return BushService.post('/tags/ensayos',tags)
                    .then((data:Array<IEnsayo>) => {
                        return data
                    })
    }

    private searchAssays(selectedTags:Array<AutocompleteTag>,state?:assayState):Promise<void>{
        let actualState = state? state : this.state.state
        this.setLoading(true)
        return this.searchAssaysByTags(selectedTags)
                    .then((suggestedAssays)=>{
                        console.log(suggestedAssays)
                        let filteredAssays:Array<IEnsayo> = []
                        if(actualState === 'ALL') filteredAssays = suggestedAssays
                        else filteredAssays = suggestedAssays.filter(assay => assay.state === actualState)
                        this.setState({
                            ...this.state,
                            filteredAssays,
                            loading:false
                        })
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


                <div className="welcome">
                        
                </div>
                <HomeSearcher search={this.searchAssays.bind(this)}
                            setSelectedTags = {this.setSelectedTags.bind(this)}
                            selectedTags={this.state.selectedTags}/>
                <Tabs assayStates={assayStates}
                      handleTab={this.handleTab.bind(this)}
                      />
        

                {this.state.assayToFinish!=null &&
                    <AssayFeedback idAssay={this.state.assayToFinish}
                                   finishAssay={this.finishAssay.bind(this)}
                                   closeFeedback={this.closeAssayFeedback.bind(this)}
                                    />
                                }
                

                {!this.state.loading?
                    <HomeContext.Provider value={context}>
                         <div className="ensayos">
                            {this.state.filteredAssays.length === 0 && 
                            <div className="info-content">
                                <div className="empty-content-image"/>
                                <div className="info-content-description">
                                    <h4>No hemos encontrado resultados.</h4>
                                    <p>Ooops... Todavía no tenes ensayos que coincidan con tu búsqueda.</p>
                                </div>
                            </div>}
                            {this.state.filteredAssays.map((ensayo: IEnsayo,i) => (
                                <Ensayo key={i} {...this.props} ensayo={ensayo} />
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
                open={Boolean(this.state.feedback)}
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
