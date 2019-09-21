import * as React from "react";


export interface ISearchProps{
    searchAction: string,
    deleteAction: string,
    title: string,
    form: React.ReactElement,
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
    registerRequested: boolean;
    searchSuccess?: boolean;
}

export interface ISearchContext extends ISearchState {
    setValues: (values: IValues) => void
    data: Array<any>
    remove: (object:any) => Promise<void>
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
        const registerRequested: boolean = false;
        this.state = {
            errors,
            values,
            data,
            registerRequested
        };
    }

    private getData()  {
      return fetch(this.props.searchAction, {
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
    }

    private handleRequest = async (
      e: React.MouseEvent<HTMLElement>
      ): Promise<void> => {
        e.preventDefault();
          this.setState({registerRequested: true})
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

    private remove = async (object:any): Promise<void> => {
        return fetch(this.props.deleteAction,{
          method: 'DELETE',
          mode: 'cors',
          body: JSON.stringify(object),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        .then(response => console.log(response.json()))
        .catch(error => console.log(error))
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
            remove:this.remove
        };
        return(
            <SearchContext.Provider value={context}>
                <div className="container">
                  <div className="search-wrapper">
                    <div className="title-wrapper">
                      <img src="src/assets/images/head-icon.png"/>
                      <p>{this.props.title}</p>
                    </div>
                    {this.props.render()}

                    <button onClick={this.handleSearch}>Buscar</button>
                    
                    <button onClick={this.handleRequest}>Agregar</button>                    
                    {this.state.registerRequested && this.props.form}
                  </div>
                    
                
                </div>
            </SearchContext.Provider>
        )
    }
}

export default Search;