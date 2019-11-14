import * as React from 'react'
import { ISearchItem } from '../../../Interfaces/SearchItem';

export type ItemType = "agrochemical" |
              "crop"| 
              "mix" | 
              "companie" | 
              "user";


export interface IItemProps{
    item:ISearchItem
    updateItem:Function
    type:ItemType
}

const Item:React.SFC<IItemProps> = (props) => {

    const [name,setName] = React.useState<string>(props.item.name)
    const [description,setDescription] = React.useState<string>(props.item.description)   
    const [isUpdate,setUpdate] = React.useState(false)

    const updateItem = () => {
        let newItem:ISearchItem = {
            ...props.item,
            name:name,
            description:description
        }
        props.updateItem(newItem)
    }
    
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
                               onChange={(e) => {setName(e.currentTarget.value) }}
                               onBlur={()=>{
                                   setUpdate(false)
                                   setName(props.item.name)
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
                              onKeyPress={(e) => {
                                if(e.key==='Enter'){
                                   updateItem()
                                   setUpdate(false)
                                }
                            }}
                              onChange={(e) => {setDescription(e.currentTarget.value)}}
                            onBlur={()=>{
                                setUpdate(false)
                                setDescription(props.item.description)
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
