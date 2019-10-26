import * as React from "react";
import { ItemType } from "./components/Item";
import Results from "./Results";
import { ISearchItem } from "../../Interfaces/SearchItem";
import Loader from "../Utilities/Loader/Loader";

export interface ISearchProps{
   retrieve?: () => Promise<Array<any>>,
   remove?: (object:ISearchItem) => Promise<void>,
   update?: (object:ISearchItem) => Promise<void>,
   type: ItemType
}

export interface IValues {
    [key: string]: any;
}

export interface ISearchState {
    values: IValues;
    error: string;
    data: Array<any>;
    loading: boolean,
    searchSuccess?: boolean;
}

export interface ISearchContext extends ISearchState {
    setValues: (values: IValues) => void
    data: Array<any>
    remove: (object:any) => Promise<void>
    update: (object:any) => Promise<void>
  }

export const SearchContext = React.createContext<ISearchContext | undefined> (
    undefined
  );

export class Search extends React.Component<ISearchProps,ISearchState> {
    constructor(props:ISearchProps){
        super(props);

        const error:string = '';
        const values: IValues = {};
        const data: Array<any> = []
        this.state = {
            error,
            values,
            data,
            loading:true
        };
    }

    private fetchData() {
      this.setState({loading:true})
      const {retrieve} = this.props;
      retrieve().then(data => this.setState({data:data,loading:false}))
    }

    componentDidMount(){
      this.fetchData()
    }
    private setValues = (values: IValues) => {
        this.setState({values: {...this.state.values, ...values}});
      ;}

    public render (){
        const context: ISearchContext = {
            ...this.state,
            setValues:this.setValues,
            data: this.state.data,
            remove:this.props.remove,
            update:this.props.update,
        };
        return(
            <SearchContext.Provider value={context}>
               <div className="search-container">
                 {!this.state.loading?
                    <Results type={this.props.type}/>
                    :
                    <Loader/>
                 }
              </div>
            </SearchContext.Provider>
        )
    }
}



export default Search;