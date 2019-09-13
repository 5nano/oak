import * as React from 'react';



export interface IResultsProps {
    data: Array<any>
}

export default class Results extends React.Component<IResultsProps> {

    constructor(props:IResultsProps){
        super(props)

    }

    render(){
        console.log(this.props.data)
        var list = this.props.data.map(function(obj:any){
            return(
                <li>{obj.name}</li>
            );
        });
            return(
                    <ul>
                        {list}
                    </ul>
            )
        }  
}
