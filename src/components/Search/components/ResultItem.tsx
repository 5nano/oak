import * as React from 'react';
import Item, { ItemType } from './Item';
import { ISearchItem } from '../../../Interfaces/SearchItem';
export interface IResultItemProps{
    item:ISearchItem;
    remove:(object:ISearchItem) => Promise<void>;
    update:(object:ISearchItem) => Promise<void>;
    type:ItemType;
}

const ResultItem:React.SFC <IResultItemProps> = (props) => {
   
        const {type,remove,update} = props;
        return(
            <li className="results-item">
                <Item item={props.item}
                      updateItem={update} 
                      type={type}/>
                <div className="result-controller">
                    <a className='action' onClick={()=>remove(props.item)}>
                        <i className="icon icon-trash"></i>
                    </a>
                </div>
            </li>
        )
}

export default ResultItem;