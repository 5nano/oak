import * as React from 'react';
import Search, {ISearchContext,SearchContext} from './Search';


export interface IResultsProps {
    
}

export default class Results extends React.Component<IResultsProps> {

    constructor(props:IResultsProps){
        super(props)

    }

    render(){
        var list:Array<any>
        list = [];
       
            return(
                <SearchContext.Consumer>
                   {(context: ISearchContext) =>(
                     <ul>
                        {
                            context.data.map(function(obj:any){
                                return (
                                    <li>{obj.name}</li>
                                )
                            })
                         }
                        {list}
                    </ul>
                   )}
                </SearchContext.Consumer>
            )
        }  
}
