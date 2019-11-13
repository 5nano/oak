import * as React from 'react';
import Item, { ItemType } from './components/Item';
import { ISearchItem } from '../../Interfaces/SearchItem';
import { throws } from 'assert';

export interface IResultsProps {
   type:ItemType;
   data:Array<ISearchItem>;
   update: (item:ISearchItem) => void;
   remove: (item:ISearchItem) => void;
}

interface IResultsState{
    filteredItems:Array<ISearchItem>
}

class Results extends React.Component <IResultsProps,IResultsState> {
    
    
    constructor(props){
        super(props)
        this.state = {
            filteredItems:[]
        }

        this.handleCriteria = this.handleCriteria.bind(this)
    }

    componentDidMount(){
        this.setState({filteredItems:this.props.data})
    }

    componentWillReceiveProps(nextProps:IResultsProps){
        this.setState({filteredItems:nextProps.data})
    }

    handleCriteria (criteria:string) {
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
      filteredItems: newList
      });
}
    render(){
        const {type,update,remove} = this.props;
    

        return(
            <div className="results-container">
                <div className="search-bar">
                        <input type="text" placeholder="Buscar..." 
                                onChange={(e) => this.handleCriteria(e.currentTarget.value)}/>
                </div>

                {this.state.filteredItems.length===0?
                <div className="info-content">
                    <div className="info-content-image">
                     <img src="../../../assets/images/tumbleweed.png"/>
                    </div>
                    <div className="info-content-description">
                        Ooops... Todavía no tenes items que coincidan con tu búsqueda.
                    </div>
                </div>
                :
                <div className='results-wrapper'>
                    <ul className="results-list">
                            {this.state.filteredItems.map((item,i) => {
                                return (
                                    <li key={item.name} className="results-item">
                                        <Item 
                                            item={item}
                                            updateItem={update} 
                                            type={type}/>
                                        <div className="result-controller">
                                            <a className='action' onClick={()=>remove(item)}>
                                                <i className="icon icon-trash"></i>
                                            </a>
                                        </div>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
                }
            </div>
        )}
}

export default Results;