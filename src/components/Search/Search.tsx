import * as React from "react";
import { ItemType } from "./components/Item";
import Results from "./Results";
import BushService from '../../services/bush';
import Spinner from 'react-spinner-material';
import { ISearchItem } from "../../Interfaces/SearchItem";
import Error from "../Utilities/Messages/Error";

export interface ISearchProps{
    searchAction: string,
    deleteAction: string,
    updateAction:string,
    type: ItemType,
    render: () => React.ReactNode
}

export interface IValues {
    [key: string]: any;
}

export interface ISearchState {
    values: IValues;
    error: string;
    data: Array<any>;
    searchSuccess?: boolean;
    loading: boolean;

}

export interface ISearchContext extends ISearchState {
    setValues: (values: IValues) => void
    data: Array<any>
    remove: (object:any) => Promise<void>
    update: (object:any) => Promise<void>
    search: (event: React.MouseEvent) => Promise<void>
  }

export const SearchContext = React.createContext<ISearchContext | undefined> (
    undefined
  );



export class Search extends React.Component<ISearchProps,ISearchState> {
    constructor(props:ISearchProps){
        super(props);

        const error:string = '';
        const values: IValues = {};
        const data: Array<any> = [];
        this.state = {
            error,
            values,
            data,
            loading:true
        };

        this.remove=this.remove.bind(this)
        this.update=this.update.bind(this)
    }

    private async getData(){
      this.setState({loading:true})
      return BushService.get(this.props.searchAction)
      .then(data =>{
        this.setState({data: data,loading:false})
      })
      .catch(error => {
        error.json().then(error=> this.setState({error:error.message}))
      })   
    }


    private handleSearch = async (
    e: React.MouseEvent<HTMLElement>
      ): Promise<void> => {
      e.preventDefault();

      /* TODO check if there is any criteria(values), 
        if not, get all crops
      */ 
    return this.getData();

    };

    private setValues = (values: IValues) => {
        this.setState({values: {...this.state.values, ...values}});
      ;}

    private async remove(object:ISearchItem):Promise<void> {
      console.log(object)
      return BushService.delete(this.props.deleteAction,object)
                        .then(() => {this.getData()})
                        .catch(error => {
                          error.json().then(error=> {
                            this.setState({error:error.message})
                            this.getData()
                          })
                        })  
    }

    private async update(object:ISearchItem):Promise<void> {
      return BushService.patch(this.props.updateAction,object)
                        .then(() => {this.getData() })
                        .catch(error => {
                          error.json().then(error=> {
                            this.setState({error:error.message})
                            this.getData()
                          })
                        }) 
    }

    public componentDidMount(){
      this.getData();
    }

    public render (){
        const context: ISearchContext = {
            ...this.state,
            setValues:this.setValues,
            data: this.state.data,
            remove:this.remove,
            update:this.update,
            search:this.handleSearch
        };
        return(
          
            <SearchContext.Provider value={context}>
               <div className="search-container">
                  {this.state.error.length>0 && 
                  <Error message={this.state.error}/>
                  }
                  {!this.state.loading?
                    <Results type={this.props.type}/>
                  :
                  <div className="search-loading">
                    <Spinner size={240} 
                    spinnerColor={"#6AC1A9"} 
                    spinnerWidth={3} 
                    visible={true}/>
                  </div>
                  }
              </div>
            </SearchContext.Provider>
        )
    }
}

export default Search;