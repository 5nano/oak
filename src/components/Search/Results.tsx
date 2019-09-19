import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';

export interface IResultsTableProps {
    titles: string[];
}

export const Results:React.SFC<IResultsTableProps> = ({titles}) => {
        
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <li className="results">
                        {context.data.map(object => {
                            return (
                                <ul>{
                                    Object.keys(object).map((key:any) => {
                                        return (
                                        <p>{object[key]}</p>)
                                        })}
                    
                                        <button 
                                            onClick={e => context.remove(object)}>
                                                Eliminar
                                        </button>
                                    
                                </ul>)
                        })}
                </li>
                )}
        </SearchContext.Consumer>
    )
}

export default Results;