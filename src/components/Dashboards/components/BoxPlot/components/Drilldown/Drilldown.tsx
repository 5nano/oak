import * as React from "react";
import { Experimento } from '../../ExperimentoType';
import BushService from "../../../../../../services/bush";
import { ITest} from "../../../../../../Interfaces/Experimento";
import Loader from "../../../../../Utilities/Loader/Loader";
import TestCarrousel from "../Carrousel/TestCarrousel";


export interface DrillDownState {
  showExperiment: string,
  experimentImage:ITest,
}

export interface DrillDownProps {
    treatmentId: number,
    date: string,
    experiments: Array<Experimento>,
    close: Function,
    pointerDirection: 'left' | 'right' 
}

class DrillDown extends React.Component<DrillDownProps, DrillDownState> {
  constructor(props:DrillDownProps){
    super(props)
    this.state = {
      showExperiment: null,
      experimentImage:null,
    }
  }

  showExperimentImage(experimentId: string) {
    this.setState({
      showExperiment: this.state.showExperiment ? null : experimentId, // Toggle logic
    })
  }

  render(){
    return (
        <div className="DrillDown">
            <div className="title">
              <h1>Detalle de tratamiento {this.props.treatmentId}</h1>
              <h2>Fecha: {this.props.date}</h2>
            </div>
            <div className={`close icon-${this.props.pointerDirection}-open`} onClick={() => this.props.close()}></div>
            <div className="sub-title"> Ver imágen del experimento:</div>
            
            <div className="experimentos">
              {
                this.props.experiments && this.props.experiments.map(experiment => {
                  return (
                    <div className="experiment" onClick={() => this.showExperimentImage(experiment.experimentId)}>
                      <div className="experiment-title">
                      Experimento {experiment.experimentId}
                      </div>
                      {
                        this.state.showExperiment === experiment.experimentId &&
                            <TestCarrousel experimentId={Number(experiment.experimentId)}/>
                      }
                    </div>
                  )
                })
              }
            </div>
        </div>
    );
  }
};


export default DrillDown;
