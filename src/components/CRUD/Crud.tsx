import * as React from "react";
import { IValues } from "../Form/Form";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { ISearchItem } from "../../Interfaces/SearchItem";
import Search from "../Search/Search";
import { ItemType } from "../Search/components/Item";
import Loader from "../Utilities/Loader/Loader";


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
  formRequest:boolean,
  loading:boolean,
  data: Array<any>
}

class CrudView extends React.Component<ICrudViewProps,ICrudViewState> {
  
  constructor(props){
    super(props)

    this.state = {
      formRequest: false,
      loading: true,
      data:[]
    }

    this.submitForm = this.submitForm.bind(this)
    this.retrieve = this.retrieve.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount(){
    this.retrieve()
  }

  setFormRequest (value:boolean) {
    this.setState({formRequest:value})  
  }

  submitForm(values:IValues): Promise<boolean> {
    return BushService.post(this.props.createUrl, values)
      .then(() => {
        this.retrieve().then(()=>this.setFormRequest(false))
        return true
      })
  }
  
  retrieve():Promise<void> {
    this.setState({loading:true})
    return BushService.get(this.props.searchUrl)
                      .then((data:Array<any>) => {
                        data.sort
                        this.setState({data:data,loading:false})
                      })
  }

   remove (object:ISearchItem):Promise<void> {
      return BushService.post(this.props.deleteUrl,object)
                        .then(() => {this.retrieve()})  
    }

    update(object:ISearchItem):Promise<void> {
      return BushService.patch(this.props.updateUrl,object)
                        .then(() => {this.retrieve()})
    }

    cancelForm(formRequest:boolean){
      this.setFormRequest(formRequest)
    }

    render(){
     const {title,type,form:Form} = this.props
     
     const singleTitle = title.substring(0,title.length - 1).toLowerCase()
      return (
          <div className="crud-container">
              <div className="crud-title">
                {title}
              </div>

              {this.state.loading? <Loader/>
              :
              <div className="layout-wrapper">
                  <div className="search-crud-wrapper">
                      <Search data={this.state.data} 
                              retrieve={this.retrieve}
                              remove={this.remove}
                              update={this.update}
                              type={type}/>
                      <Button title={title==='Mezclas'?'Nueva '+ singleTitle:'Nuevo '+ singleTitle}
                              onClick={()=>this.setFormRequest(true)}
                              />
                  </div>
                  {this.state.formRequest &&
                    <div className="form-crud-wrapper">
                      <div className="form-cancel" onClick={()=>this.setFormRequest(false)}>
                          <i className="icon icon-left-open"/>
                      </div>
                        <Form submitForm={this.submitForm}
                              cancel={this.cancelForm}/>
                    </div>
                       }
              </div>
              }
          </div>
    
      );
    }
};

export default CrudView;