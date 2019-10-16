import * as React from "react";
import { ItemType } from "./components/Item";
import Results from "./Results";
import SearchButton from "./SearchButton";
import BushService from '../../services/bush';


export interface ISearchProps{
    searchAction: string,
    deleteAction: string,
    type: ItemType,
    render: () => React.ReactNode
}

export interface IValues {
    [key: string]: any;
}

export interface IErrors {
    [key: string]: string
}


export interface ISearchState {
    values: IValues;
    errors: IErrors;
    data: Array<any>;
    searchSuccess?: boolean;

}

export interface ISearchContext extends ISearchState {
    setValues: (values: IValues) => void
    data: Array<any>
    remove: (object:any) => Promise<void>
    search: (event: React.MouseEvent) => Promise<void>
  }

export const SearchContext = React.createContext<ISearchContext | undefined> (
    undefined
  );



export class Search extends React.Component<ISearchProps,ISearchState> {
    constructor(props:ISearchProps){
        super(props);


        const errors: IErrors={}
        const values: IValues = {};
        const data: Array<any> = [];
        this.state = {
            errors,
            values,
            data,
        };

        this.remove=this.remove.bind(this)
    }

    private async getData()  {
      return BushService.get(this.props.searchAction)
      .then(data =>{
               
              this.setData(data)
      })
      .catch(e => {
          this.setState({ errors: e });
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

    private setData = (data:Array<any>) => {
        this.setState({data: data})
    }

    private setValues = (values: IValues) => {
        this.setState({values: {...this.state.values, ...values}});
      ;}

    private async remove(object:any):Promise<void> {
      console.log(object)
      console.log(this.props.deleteAction)
      return BushService.delete(this.props.deleteAction)
        .then(data => {this.getData() })
    }

    public componentDidMount(){
      this.getData();
    }

    public render (){
        const {searchSuccess, errors} = this.state
        const context: ISearchContext = {
            ...this.state,
            setValues:this.setValues,
            data: this.state.data,
            remove:this.remove,
            search:this.handleSearch
        };
        return(
            <SearchContext.Provider value={context}>
               <div className="search-container">
                <Results type={this.props.type}/>
              </div>
            </SearchContext.Provider>
        )
    }
}

export default Search;