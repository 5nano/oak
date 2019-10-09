import * as React from "react";
import { IEnsayo } from '../../../../Interfaces/IEnsayo';
import Ensayo from "../Ensayo/Ensayo";


export interface IEnsayosState {
    ensayoSelected: IEnsayo["idAssay"],
}

export interface IEnsayosProps {
    ensayos: Array<IEnsayo>,
    onSelect: Function,
    onQrs: Function,
    onRemove: Function,
}

export class Ensayos extends React.Component<IEnsayosProps,IEnsayosState> {


    constructor(props: IEnsayosProps){
        super(props);
        this.state ={
            ensayoSelected: null,
        };
    }


    render(){
        const { onSelect, onQrs , onRemove} = this.props;
    return(
        <div className="ensayos">
            {this.props.ensayos.map((ensayo: IEnsayo) => (
               <Ensayo ensayo={ensayo} 
                       onSelect={onSelect}
                       onQrs={onQrs}
                       onRemove={onRemove}/>
            ))}
        </div>
    )
    }
}

export default Ensayos;
