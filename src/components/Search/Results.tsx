import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';

export interface IResultsTableProps {
    titles: string[];
}

export const Results:React.SFC<IResultsTableProps> = ({titles}) => {
        
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <table className="result-table">
                    <tbody>

                        <tr>
                        {titles.map(title => {return <th>{title}</th>})}
                        <th>Opciones</th>
                        </tr>

                        {context.data.map(object => {
                            return (
                                <tr>{
                                    Object.keys(object).map((key:any) => {
                                        return (
                                        <td>{object[key]}</td>)
                                        })}
                                    <td>
                                        <button 
                                            onClick={e => context.remove(object)}>
                                                Eliminar
                                        </button>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                )}
        </SearchContext.Consumer>
    )
}

export default Results;