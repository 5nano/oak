import * as React from "react";

export interface ISearchProps{
    action: string,
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
    searchSuccess?: boolean;
}

export interface ISearchContext extends ISearchState {
    setValues: (values: IValues) => void;
  }

export const SearchContext = React.createContext<ISearchContext | undefined> (
    undefined
  );



export class Search extends React.Component<ISearchProps,ISearchState> {
    constructor(props:ISearchProps){
        super(props);

        const errors: IErrors={}
        const values: IValues = {};
        this.state = {
            errors,
            values
        };
    }


    private handleSearch = async (
    e: React.MouseEvent<HTMLElement>
      ): Promise<void> => {
      e.preventDefault();

      console.log(this.state.values);
    
      /* TODO fetch action to get crops from server
      
            check if there is any criteria(values), if not, get all crops
      */ 
    };

    private setValues = (values: IValues) => {
        this.setState({values: {...this.state.values, ...values}});
      ;}

    public render (){
        const {searchSuccess, errors} = this.state
        const context: ISearchContext = {
            ...this.state,
            setValues:this.setValues
        };
        return(
            <SearchContext.Provider value={context}>
                <div className="container">
                    {this.props.render()}
                </div>
                <button onClick={this.handleSearch}>Buscar</button>
            </SearchContext.Provider>
        )
    }
}

export default Search;