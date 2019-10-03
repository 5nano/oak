import * as React from 'react';
export interface IResultItemProps{
    object:any;
    remove:(object: any) => Promise<void>
}

const ResultItem:React.SFC<IResultItemProps> = (props) => {
    
    const {object,remove} = props;
    return(
        <div className="results-item">
                                    
        {
        Object.keys(object).map((key:any) => {
          
            return (
                    <div className="item-prop">
                         <p>{key+ ': ' + object[key]}</p>
                    </div>
                    )
        })}

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