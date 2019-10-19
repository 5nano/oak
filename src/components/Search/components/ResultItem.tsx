import * as React from 'react';
import Item, { ItemType } from './Item';
import { ISearchItem } from '../../../Interfaces/SearchItem';
export interface IResultItemProps{
    item:ISearchItem;
    remove:(object:ISearchItem) => Promise<void>;
    update:(object:ISearchItem) => Promise<void>;
    type:ItemType;
}

interface IResultItemState{
    item:ISearchItem;
}
class ResultItem extends React.Component<IResultItemProps,IResultItemState> {
    
    constructor(props:IResultItemProps){
        super(props)
        this.state = {
            item:props.item
        }
    }

    onChange(value:string,field:string){
        this.setState(prevState => {
            let item = prevState.item
            item[field] = value
            return {item}
        })
    }

    updateItem(){
        this.props.update(this.state.item)
    }
    render(){
        const {type,remove,update} = this.props;
        return(
            <div className="results-item">
                <Item item={this.state.item}
                      onChange={this.onChange.bind(this)}
                      updateItem={this.updateItem.bind(this)} 
                      type={type}/>
                <div className="result-controller">
                    <a className='action' onClick={()=>remove(this.state.item)}>
                        <i className="icon icon-trash"></i>
                    </a>
                </div>
            </div>
        )
    }
}

export default ResultItem;