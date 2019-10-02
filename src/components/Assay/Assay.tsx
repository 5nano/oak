import * as React from 'react'
import AssayForm from './AssayForm';

class Assay extends React.Component {
    

    render(){
        return(
            <div className="crud-container">
                    <div className="title-wrapper">
                        <img src="../../assets/images/head-icon.png"/>
                        <p>Nuevo Ensayo</p>
                    </div>

                    <AssayForm/>
            </div>
            
        )
    }
}

export default Assay;