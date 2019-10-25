import * as React from 'react'
import Spinner from 'react-spinner-material'

const Loader: React.SFC = () => {
    return (
        <div className="loading-container">
            <Spinner size={240} 
                        spinnerColor={"#6AC1A9"} 
                        spinnerWidth={3} 
                        visible={true}/>
        </div>
    )
}

export default Loader;