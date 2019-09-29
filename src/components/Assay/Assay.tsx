import * as React from 'react'
import AssayForm from './AssayForm'
import TreatmentForm from './TreatmentForm';

class Assay extends React.Component {
    

    render(){
        return(
            <div className="crud-container">
                <div>
                    <div className="title-wrapper">
                    <img src="../../assets/images/head-icon.png"/>
                    <p>Ensayos</p>
                    </div>

                    <AssayForm/>
                </div>
            </div>
            
        )
    }
}

export default Assay;