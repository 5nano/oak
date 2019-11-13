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

    

    public render (){
        const {remove,update,type} = this.props

        return(
                <div id="search-container" className="search-container">
                    
                    <Results data={this.state.filteredData}
                            remove={remove}
                            update={update}
                            type={type}/>
                </div>
        )
    }
}



export default Search;