import * as React from 'react';


export interface ICropProps{
    name: string,
    description: string
}

export default class Crop extends React.Component<ICropProps> {

    constructor(props: ICropProps){
        super(props)
    }

    render(){
        return(
            <div className="crop-container">
                    <h1>{this.props.name}</h1>
                    <p>{this.props.description}</p>
            </div>
        )
    }
}
