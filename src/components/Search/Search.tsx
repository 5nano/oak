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

export interface ISearchState {
    filteredData:Array<ISearchItem>
    error: string;
    searchSuccess?: boolean;
}

export interface ISearchContext {
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

        this.state = {
            filteredData:props.data,
            error:''
        };
    }

    componentDidMount(){
        this.setState({
            filteredData:this.props.data
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          filteredData: nextProps.data
        });
      }

    public handleCriteria (criteria:string) {
              // Variable to hold the original version of the list
            let currentList:Array<ISearchItem> = [];
                // Variable to hold the filtered list before putting into state
            let newList:Array<ISearchItem>= [];

                // If the search bar isn't empty
            if (criteria !== "") {
                // Assign the original list to currentList
                currentList = this.props.data;

                        // Use .filter() to determine which items should be displayed
                        // based on the search terms
                newList = currentList.filter(item => {
                            // change current item to lowercase
                            const lc = item.name.toLowerCase();
                                    // change search term to lowercase
                            const filter = criteria.toLowerCase();
                                    // check to see if the current list item includes the search term
                                    // If it does, it will be added to newList. Using lowercase eliminates
                                    // issues with capitalization in search terms and search content
                            return lc.includes(filter);
                });
            } else {
                    // If the search bar is empty, set newList to original task list
            newList = this.props.data;
            }
                // Set the filtered state based on what our rules added to newList
            this.setState({
            filteredData: newList
            });
    }

    public render (){
        const {remove,update,type} = this.props

        const context: ISearchContext = {
            data: this.state.filteredData,
            remove:remove,
            update:update,
        };
        return(
            <SearchContext.Provider value={context}>
                <div id="search-container" className="search-container">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar..." 
                                onChange={(e) => this.handleCriteria(e.currentTarget.value)}/>
                    </div>
                    <Results type={type}/>
                </div>
            </SearchContext.Provider>
        )
    }
}



export default Search;