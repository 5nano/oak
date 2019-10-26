import * as React from "react";
import { IValues } from "../Form/Form";
import BushService from '../../services/bush';
import Button from "../Utilities/Buttons/DefaultButton/Button";
import { ISearchItem } from "../../Interfaces/SearchItem";
import Search from "../Search/Search";
import { ItemType } from "../Search/components/Item";


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
  formRequest:boolean
}

class CrudView extends React.Component<ICrudViewProps,ICrudViewState> {
  
  constructor(props){
    super(props)

    this.state = {
      formRequest: false
    }

    this.submitForm = this.submitForm.bind(this)
    this.retrieve = this.retrieve.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
  }

  setFormRequest (value:boolean) {
    this.setState({formRequest:value})  
  }

  submitForm(values:IValues): Promise<boolean> {
    return BushService.post(this.props.createUrl, values)
      .then(() => {
        this.setFormRequest(false)

        return true
      })
  }
  
  retrieve():Promise<Array<any>> {
    return BushService.get(this.props.searchUrl)
                      .then(data => {
                        return data
                      })
  }

   remove (object:ISearchItem):Promise<void> {
      return BushService.delete(this.props.deleteUrl,object)
                        .then(() => {this.retrieve()})  
    }

    update(object:ISearchItem):Promise<void> {
      return BushService.patch(this.props.updateUrl,object)
                        .then(() => {this.retrieve()})
    }

    render(){
     const {title,type,form:Form} = this.props
     
      return (
          <div className="crud-container">
              <div className="crud-title">
                {title}
              </div>

              <div className="layout-wrapper">
                  <div className="search-container-wrapper">
                      <Search retrieve={this.retrieve} 
                              remove={this.remove}
                              update={this.update}
                              type={type}/>
                      <Button title={`Nuevo ${title.substring(0,title.length - 1).toLowerCase()} `}
                              onClick={()=>this.setFormRequest(true)}
                              />
                  </div>
                  {this.state.formRequest && <Form submitForm={this.submitForm}/>}
              </div>
          </div>
    
      );
    }
};

export default CrudView;