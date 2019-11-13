import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';
import ResultItem from './components/ResultItem';
import { ItemType } from './components/Item';

export interface IResultsTableProps {
   type:ItemType;
}

export const Results:React.SFC<IResultsTableProps> = (props) => {
    const {type} = props;
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <ul className="results-list">
                        {context.data.map((item,i) => {
                            return <ResultItem key={i}
                                               item={item}
                                               remove={context.remove}
                                               update={context.update}
                                               type={type}
                                         />
                        })}

                        {context.data.length === 0 && 
                            <div className="results-empty">No existen elementos</div>}
                </ul>
                )}
        </SearchContext.Consumer>
    )
}

export default Results;