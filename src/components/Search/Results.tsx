import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';


export interface IResultsTableProps {
    titles: string[];
}

export const Results:React.SFC<IResultsTableProps> = ({titles}) => {
        
    return(
        <SearchContext.Consumer>
            {(context:ISearchContext) => (
                <table>
                    <tbody>

                        <tr>
                        {titles.map(title => {return <th>{title}</th>})}
                        </tr>

                        {context.data.map(object => {
                            return (
                                <tr>{
                                    Object.keys(object).map((key:any) => {
                                        return (
                                        <td>{object[key]}</td>)
                                        })}
                                </tr>)
                        })}
                    </tbody>
                </table>
                )}
        </SearchContext.Consumer>
    )
}

export default Results;