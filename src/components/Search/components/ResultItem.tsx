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
                    <button className="delete icon-trash"
                        onClick={e => remove(object)}/>  
                    <button className="edit icon-arrows-cw"
                        onClick={e => remove(object)}/> 
            </div>
        
    </div>
    )
}

export default ResultItem;