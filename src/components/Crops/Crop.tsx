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
            <div>
                <h1>{this.props.name}</h1>
                <h2>{this.props.description}</h2>
            </div>
        )
    }
}
