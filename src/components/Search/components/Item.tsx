import * as React from 'react'

export type ItemType = "agrochemical" |
              "crop"| 
              "mix" | 
              "companie" | 
              "user";


export interface IItemProps{
    object:any;
    type:ItemType
}

const Item:React.SFC<IItemProps> = (props) => {
    
    const {object} = props;
    const name = object['name']
    const description = object['description']? object['description']:'Sin descripción'
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
                <div className="item-name">
                    {name}
                </div>
            </div>

            <div className="item-content">
              {description} 
            </div>
        </div>
    )
    
}

export default Item;
