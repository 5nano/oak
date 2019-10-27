import * as React from "react";
import { IEnsayo } from '../../../../Interfaces/IEnsayo';
import Ensayo from "../Ensayo/Ensayo";
import Info from "../../../Utilities/Messages/Info";
import { RouteComponentProps } from "react-router";

export interface IEnsayosProps extends RouteComponentProps{
    ensayos: Array<IEnsayo>
}

const Ensayos:React.SFC<IEnsayosProps> = (props) => {

    return(
        <div className="ensayos">
            {props.ensayos.length === 0 && 
            <Info message="No se registran ensayos en este estado"/>}
            {props.ensayos.map((ensayo: IEnsayo) => (
               <Ensayo {...props} ensayo={ensayo} />
            ))}
        </div>
    )
}

export default Ensayos;
