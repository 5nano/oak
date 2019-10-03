import * as React from 'react';
import Item, { ItemType } from './Item';

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
            <div className="result-controller">
                <a className='action' onClick={e => remove(object)}>
                    <i className="icon icon-trash"></i>
                </a>
                <a className='action' onClick={e => remove(object)}>
                    <i className="icon icon-arrows-cw"></i>
                </a>
                 
            </div>
        
    </div>
    )
}

export default ResultItem;