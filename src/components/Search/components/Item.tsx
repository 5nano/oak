import * as React from 'react'
import { ISearchItem } from '../../../Interfaces/SearchItem';

export type ItemType = "agrochemical" |
              "crop"| 
              "mix" | 
              "companie" | 
              "user";


export interface IItemProps{
    item:ISearchItem
    onChange:Function,
    updateItem:Function
    type:ItemType
}

const Item:React.SFC<IItemProps> = (props) => {
    
    const {item,onChange,updateItem} = props;
    const name = item.name
    const description = item.description? item.description:'Sin descripción'
    
    const [isUpdate,setUpdate] = React.useState(false)
    
    return(
        <div className="item">
            <div className="item-header">
                <div className="item-img">
                    {props.type === 'agrochemical' &&
                        <img src='../../../assets/images/agrochemical-icon.png'/>
                    }

                    {props.type === 'crop' &&
                        <img src='../../../assets/images/crop-icon.png'/>
                    }

                    {props.type === 'mix' &&
                        <img src='../../../assets/images/mix-icon.png'/>
                    }
                </div>
                <div className="item-name" onClick={()=>setUpdate(true)}>
                    {isUpdate? 
                        <input type="text"
                               value={name}
                               onChange={(e) => {
                                   onChange(e.currentTarget.value,'name')
                               }}
                               onBlur={()=>{
                                   updateItem()
                                   setUpdate(false)
                                }}
                               />
                             :
                                name
                    }
                </div>
            </div>

            <div className="item-content" onClick={()=>setUpdate(true)}>
            {isUpdate? <input type="text" 
                              value={description}
                              onChange={(e) => {
                                onChange(e.currentTarget.value,'description')
                            }}
                            onBlur={()=>{
                                updateItem()
                                setUpdate(false)
                             }}
                              />
                             :
                                description
                    }
            </div>
        </div>
    )
    
}

export default Item;
