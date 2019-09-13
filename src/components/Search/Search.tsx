import * as React from "react";
import Results from './Results';
import Crop from "../Crops/Crop";

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
    data: Array<any>;
    searchSuccess?: boolean;
}

export interface ISearchContext extends ISearchState {
    setValues: (values: IValues) => void
    data: Array<any>
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
            data
        };
    }


    private handleSearch = async (
    e: React.MouseEvent<HTMLElement>
      ): Promise<void> => {
      e.preventDefault();

      /* TODO check if there is any criteria(values), 
        if not, get all crops
      */ 
    return fetch(this.props.action, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }).then(response => {
        if (response.status > 200) {
            // Map the validation errors to IErrors 
            let responseBody: any;
            responseBody = response.json();
            const errors: IErrors = {};
          
            Object.keys(responseBody).map((key: string) => {
              // For ASP.NET core, the field names are in title case - so convert to camel case
              const fieldName = key.charAt(0).toLowerCase() + key.substring(1);
              errors[fieldName] = responseBody[key];
            });
            this.setState({ errors });
          }
        return response.json()
    }).then(data =>{
               
              this.setData(data)
      })

    };

    private setData = (data:Array<any>) => {
        this.setState({data: data})
    }

    private setValues = (values: IValues) => {
        this.setState({values: {...this.state.values, ...values}});
      ;}

    public render (){
        const {searchSuccess, errors} = this.state
        const context: ISearchContext = {
            ...this.state,
            setValues:this.setValues,
            data: this.state.data
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