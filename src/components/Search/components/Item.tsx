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
    return(
        <div className="item">
            <div className="item-img">
                <img src='../../../assets/images/agrochemical-icon.png'/>
            </div>


            <div className="item-props">
                {Object.keys(object).map((key:any) => {
                    return (
                            <div className="item-prop">
                                    <p>{key+ ': ' + object[key]}</p>
                            </div>
                            )
                    })}
            </div>
        </div>
    )
    
}

export default Item;
