import * as React from 'react';

interface ResultActionsProps{
    remove: Function,
    update: Function
}
const ResultActions:React.SFC<ResultActionsProps> = (props) => {
    const{remove,update} = props;
    return(
            <div className="result-controller">
                <a className='action' onClick={()=>remove}>
                    <i className="icon icon-trash"></i>
                </a>
                <a className='action' onClick={()=>update}>
                    <i className="icon icon-arrows-cw"></i>
                </a>
            </div>
    )
}

export default ResultActions;