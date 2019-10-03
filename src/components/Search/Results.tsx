import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';
import {IResultItemProps} from './components/ResultItem';


export interface IResultsTableProps {
   item: React.SFC<IResultItemProps>
}

export const Results:React.SFC<IResultsTableProps> = (props) => {
    
    const {item:Item} = props;
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <div className="results-list">
                        {context.data.map(object => {
                            return <Item object={object}
                                         remove={context.remove}
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