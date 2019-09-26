import * as React from 'react'
import ExperimentsForm from './ExperimentsForm'
import TreatmentForm from './TreatmentForm';

class Experiment extends React.Component {

    render(){
        return(
            <div className="crud-container">
                <div>
                    <div className="title-wrapper">
                    <img src="../../assets/images/head-icon.png"/>
                    <p>Ensayos</p>
                    </div>

                    <ExperimentsForm/>
                </div>
            </div>
            
        )
    }
}

export default Experiment;