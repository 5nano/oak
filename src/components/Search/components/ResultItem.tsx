import * as React from 'react';
import Item, { ItemType } from './Item';
import ResultActions from './ResultActions';

export interface IResultItemProps{
    object:any;
    remove:(object: any) => Promise<void>;
    type:ItemType;
}

const ResultItem:React.SFC<IResultItemProps> = (props) => {
    const {object,remove,type} = props;
    return(
        <div className="results-item">
            <Item object={object} type={type}/>
            <ResultActions remove={remove} update={()=>console.log("Update not done")}/>
        </div>
    )
}

export default ResultItem;