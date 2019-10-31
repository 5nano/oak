import * as React from 'react'
import Spinner from 'react-spinner-material'

const Loader: React.SFC = () => {
    return (
        <div className="loading-container">
            <img src='../../../assets/gifs/preloading.gif'/>
        </div>
    )
}

export default Loader;