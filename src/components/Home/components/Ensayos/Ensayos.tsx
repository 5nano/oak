import * as React from "react";
import { Ensayo } from '../../../../Interfaces/Ensayo';

export interface IEnsayosState {
    ensayoSelected: Ensayo["id"],
}

export interface IEnsayosProps {
    ensayos: Array<Ensayo>,
    onSelect: Function,
}

export class Ensayos extends React.Component<IEnsayosProps,IEnsayosState> {


    constructor(props: IEnsayosProps){
        super(props);
        this.state ={
            ensayoSelected: null,
        };
    }


    render(){
        const { onSelect } = this.props;
    return(
        <div className="ensayos">
            {this.props.ensayos.map((ensayo: Ensayo, ensayoId: number) => (
                <div className="Ensayo" onClick={() => onSelect(ensayoId)}>
                    <div className="name">
                        <div className="title">Nombre ensayo:</div> 
                        <div>{ensayo.name}</div>
                    </div>
                    <div className="description">
                        <div className="title">Descripción:</div>
                        <div>{ensayo.description}</div>
                    </div>
                </div>
            ))}
        </div>
    )
    }
}

export default Ensayos;
