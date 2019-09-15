import * as React from 'react';
import {ISearchContext,SearchContext} from './Search';
import Crop from '../Crops/Crop';

/* The available editors for the results */
type resultType = "crop" | "agrochemical";


export interface IResultsProps {
    type: resultType
}

export const Results: React.SFC<IResultsProps> =({type}) => {


    const getCrops = (data:Array<any>): any => {
        return data.map(function(cropObject:any) {
            return (
                <Crop name={cropObject.name} 
                description={cropObject.description}/>
            )
        })
    }
    

    return(
        <SearchContext.Consumer>
            {(context: ISearchContext) =>(
                <div>
                {type.toLowerCase() ==='crop' && 
                (<ul>{getCrops(context.data)}</ul>)
                }
           
                {type.toLowerCase() === 'agrochemical' && (<ul>{/*TODO*/}</ul>)}
                </div>
           )}
        </SearchContext.Consumer>
    )
   }

export default Results;

