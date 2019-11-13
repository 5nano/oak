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

    const [info,setInfo] = React.useState ({
        name:props.item.name,
        description:props.item.description
    })
    
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
                               className="item-input"
                               value={name}
                               style={{width:((name.length)+1)*8 + 'px'}}
                               onKeyPress={(e) => {
                                   if(e.key==='Enter') {
                                    updateItem()
                                    setUpdate(false) 
                                   }
                               }}
                               onChange={(e) => {
                                   onChange(e.currentTarget.value,'name')
                               }}
                               onBlur={()=>{
                                   setUpdate(false)
                                   onChange(info.name,'name')
                                }}
                               />
                             :
                                name
                    }
                </div>
            </div>

            <div className="item-content" onClick={()=>setUpdate(true)}>
            {isUpdate? <input type="text" 
                              className="item-input"
                              value={description}
                              style={{width:((description.length)+1)*8 + 'px'}}
                              onKeyPress={(e) => { console.log(e.key)
                                if(e.key==='Enter'){
                                updateItem()
                                   setUpdate(false)
                                }
                            }}
                              onChange={(e) => {
                                onChange(e.currentTarget.value,'description')
                            }}
                            onBlur={()=>{
                                setUpdate(false)
                                onChange(info.description,'description')
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
