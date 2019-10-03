import * as React from 'react';
import { IItemProps } from './Item';
export interface IResultItemProps{
    object:any;
    remove:(object: any) => Promise<void>;
    item:React.SFC<IItemProps>
}

const ResultItem:React.SFC<IResultItemProps> = (props) => {
    
    const {object,remove,item:Item} = props;
    return(
        <div className="results-item">
            <Item object={object}/>
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