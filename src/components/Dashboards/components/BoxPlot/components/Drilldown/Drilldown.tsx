import * as React from "react";
import { Experimento } from '../../ExperimentoType';
import BushService from "../../../../../../services/bush";
import { IExperimentImage } from "../../../../../../Interfaces/Experimento";


export interface DrillDownState {
  showExperimentImage: string,
  experimentImage:IExperimentImage
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
      experimentImage:null
    }
  }

  showExperimentImage(experimentId: string) {
    BushService.get(`/experiment/point?experimentId=${experimentId}&&timestamp=${this.props.date}`)
               .then((data:IExperimentImage) =>{
                  this.setState({
                    showExperimentImage: this.state.showExperimentImage ? null : experimentId, // Toggle logic
                    experimentImage:data
                  })
               } )
    
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
                      <div className="experiment-title">
                      Experimento {experiment.experimentId}
                      </div>
                      {
                        this.state.showExperimentImage === experiment.experimentId &&
                          <div className="experiment-content">
                            <div className="experiment-image">
                                {/*
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/440px-SpongeBob_SquarePants_character.svg.png" /> 
                                */}
                                <img src={this.state.experimentImage.pathImage}/>
                              </div>,

                              <div className="experiment-info">
                                <h2>Altura:</h2> <p>{this.state.experimentImage.height} mm</p>
                                <h2>Ancho:</h2> <p>{this.state.experimentImage.width}mm</p>
                                <h2>Area foliar:</h2> <p>{this.state.experimentImage.area}mm²</p>
                              </div>
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
