import * as React from "react";
import { ItemType } from "./components/Item";
import Results from "./Results";
import { ISearchItem } from "../../Interfaces/SearchItem";

export interface ISearchProps{
   retrieve: () => Promise<void>,
   remove: (object:ISearchItem) => Promise<void>,
   update: (object:ISearchItem) => Promise<void>,
   data: Array<any>
   type: ItemType
}

export interface IValues {
    [key: string]: any;
}

export interface ISearchState {
    values: IValues;
    error: string;
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
        this.state = {
            error,
            values
        };
    }

    private setValues = (values: IValues) => {
        this.setState({values: {...this.state.values, ...values}});
      ;}

    public render (){
        const {data,remove,update,type} = this.props

        const context: ISearchContext = {
            ...this.state,
            setValues:this.setValues,
            data: data,
            remove:remove,
            update:update,
        };
        return(
            <SearchContext.Provider value={context}>
                <div className="search-container">
                    <Results type={type}/>
                </div>
            </SearchContext.Provider>
        )
    }
}



export default Search;