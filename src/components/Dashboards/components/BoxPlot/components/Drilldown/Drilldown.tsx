import * as React from "react";
import { Experimento } from '../../ExperimentoType';


export interface DrillDownState {
  showExperimentImage: string,
}

export interface DrillDownProps {
    treatmentId: number,
    date: string,
    data: Array<Experimento>,
    close: Function,
    pointerDirection: 'left' | 'right' 
}

class DrillDown extends React.Component<DrillDownProps, DrillDownState> {
  constructor(props:DrillDownProps){
    super(props)
    this.state = {
      showExperimentImage: null,
    }
  }

  showExperimentImage(experimentId: string) {
    this.setState({
      showExperimentImage: this.state.showExperimentImage ? null : experimentId, // Toggle logic
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
                this.props.data && this.props.data.map(experiment => {
                  return (
                    <div className="experiment" onClick={() => this.showExperimentImage(experiment.experimentId)}>
                      Experimento {experiment.experimentId}
                      {
                        this.state.showExperimentImage === experiment.experimentId &&
                        <div className="experiment-image">
                          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/440px-SpongeBob_SquarePants_character.svg.png" /> 
                        </div>
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
