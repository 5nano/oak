import * as React from "react";
import { IValues } from "../Form/Form";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { ISearchItem } from "../../Interfaces/SearchItem";
import Search from "../Search/Search";
import Loader from "../Utilities/Loader/Loader";
import { ItemType } from "../Search/components/Item";
import Error from "../Utilities/Messages/Error";
import { Fade, Popper, Snackbar } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MySnackbarContentWrapper, { Feedback } from "../Feedback/MySnackbarContentWrapper";

export interface ICrudViewProps{
    title:string,
    searchUrl: string,
    deleteUrl: string,
    updateUrl: string,
    createUrl: string
    form?: any,
    type:ItemType,
}

interface ICrudViewState{
  loading:boolean,
  data: Array<any>,
  feedback:Feedback,
  formAnchor: HTMLElement
}

class CrudView extends React.Component<ICrudViewProps,ICrudViewState> {
  
  constructor(props){
    super(props)

    this.state = {
      loading: true,
      data:[],
      feedback:null,
      formAnchor:null
    }

    this.submitForm = this.submitForm.bind(this)
    this.retrieve = this.retrieve.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount(){
    this.retrieve()
  }

  handleForm() {
    if(Boolean(this.state.formAnchor)) this.closeForm()
    else this.openForm()
  }

  openForm () {
   var anchor = document.getElementById('search-container')
   this.setState({formAnchor:anchor})
  }

  closeForm(){
    this.setState({formAnchor:null})
  }



  submitForm(values:IValues): Promise<boolean> {
    this.setState({feedback:null})
    return BushService.post(this.props.createUrl, values)
      .then(() => {
        this.setState({feedback:{variant:'success',message:'El registro fue exitoso!'}});
        this.retrieve().then(()=>this.closeForm())
        return true;
      })
      .catch(error => {
        error.json().then(error => this.setState({feedback:{variant:'error',message:error.message}}))
        return false
      })
  }
  
  retrieve():Promise<void> {
    this.setState({loading:true})

    return BushService.get(this.props.searchUrl)
                      .then((data:Array<ISearchItem>) => {
                        this.setState({data:data,loading:false})
                      })
  }

   remove (object:ISearchItem):Promise<void> {
     this.setState({feedback:null})
     let id:Number;
     switch(this.props.type){
       case 'agrochemical':
            id=object.idAgrochemical
         break;
        case 'mix':
            id=object.idMixture
          break;
        case 'crop':
            id=object.idCrop
          break;
     }
      let urlDelete = this.props.deleteUrl+id
      return BushService.post(urlDelete)
                        .then(() => {this.retrieve()}) 
                        .catch(error => {
                          error.json()
                               .then(error => this.setState({feedback:{variant:'error',message:error.message}}))
                        })

                        
    }

    update(object:ISearchItem):Promise<void> {
      this.setState({feedback:null})
      return BushService.patch(this.props.updateUrl,object)
                        .then(() => {
                          this.retrieve()
                        })
    }

    private handleSnackbarClose(event?: React.SyntheticEvent,reason?:string) {
      if (reason ==='clickaway') { 
          return;
      }
      this.setState({feedback:null})
    }

    getSingleTitle(title:string){
      return  title.substring(0,title.length - 1).toLowerCase()
    }

    render(){
      const {title,type,form:Form} = this.props
      
      const singleTitle = this.getSingleTitle(title)
      const addButton = title==='Mezclas'?'Nueva '+ singleTitle:'Nuevo '+ singleTitle
      return (
            this.state.loading? 
              <div style={{display:'flex',justifyContent:'center'}}>
                <Loader/>
              </div>
            :
          <div className="crud-container">
            <div id="crud-wrapper" className="crud-wrapper">
             
              <div id='crud-title' className="crud-title">
                <h1>{title}</h1>
              </div>


              <div className="layout-wrapper">
                  <div className="search-crud-wrapper">
                      <Search data={this.state.data} 
                              retrieve={this.retrieve}
                              remove={this.remove}
                              update={this.update}
                              type={type}/>
                      <Button title={Boolean(this.state.formAnchor)? 'Cancelar' : addButton}
                              onClick={()=>this.handleForm()}
                              />
                  </div>
                  <Popper id='form' 
                          style={{marginLeft:'60px',backgroundColor:'white'}}
                          open={Boolean(this.state.formAnchor)}
                          anchorEl={this.state.formAnchor} 
                          placement={'right'}
                          transition>
                            {({TransitionProps}) => (
                              <Fade {...TransitionProps}>
                                    <Form submitForm={this.submitForm.bind(this)}/>
                              </Fade>
                            )}
                    </Popper>
                    
              </div>
              
               
            </div>

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
    
      );
    }
};

export default CrudView;