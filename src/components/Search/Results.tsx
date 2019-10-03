import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';
import { IItemProps } from './components/Item';
import ResultItem from './components/ResultItem';


export interface IResultsTableProps {
   item: React.SFC<IItemProps>
}

export const Results:React.SFC<IResultsTableProps> = (props) => {
    
    const {item:Item} = props;
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <div className="results-list">
                        {context.data.map(object => {
                            return <ResultItem object={object}
                                               remove={context.remove}
                                               item={Item}
                                         />
                        })}

                        {context.data.length === 0 && 
                            <div className="results-empty">No existen elementos</div>}
                </div>
                )}
        </SearchContext.Consumer>
    )
}

export default Results;