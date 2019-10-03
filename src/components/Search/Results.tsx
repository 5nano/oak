import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';

export interface IResultsTableProps {
   
}

export const Results:React.SFC<IResultsTableProps> = () => {
        
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <div className="results-list">
                        {context.data.map(object => {
                            return (
                                <div className="results-list-item">
                                    
                                    {
                                    Object.keys(object).map((key:any) => {
                                      
                                        return (
                                        <p>{key+ ': ' + object[key]}</p>)
                                        })}
                    
                                        <button 
                                            onClick={e => context.remove(object)}>
                                                Eliminar
                                        </button>
                                    
                                </div>)
                        })}

                        {context.data.length === 0 && 
                            <div className="results-empty">No existen elementos</div>}
                </div>
                )}
        </SearchContext.Consumer>
    )
}

export default Results;